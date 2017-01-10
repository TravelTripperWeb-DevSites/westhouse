# Generate pages from individual records in yml files
# (c) 2014 Adolfo Villafiorita
# Distributed under the conditions of the MIT License

module Jekyll
  class DataPage < Page
    attr_reader :data_source, :source_path, :model_id

    def initialize(site, base, dir, data, name, template, source_dir)
      @site = site
      @base = base
      @dir = dir
      @model_id = name
      @data_source = source_dir + '/' + (data['__INSTANCE__'] || "#{name}.json")
      file_name = sanitize_filename(self.url_friendly_name(data) || name)
      @name = file_name  + ".html"
      @source_path = '_layouts/' + template + '.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), template + ".html")
      self.data.merge!(data)
      self.data['data'] = data
      self.data['title'] ||= name
      permalink = self.data_permalink || File.join(dir, file_name)
      if permalink && !(permalink.end_with?('/') || permalink.end_with?('.html'))
        #p "Permalink #{permalink} is invalid. Must ends with '/' or html extension"
        permalink += '/'
      end
      self.data['permalink'] = permalink
    end
  
    def data_permalink
      self.data.nil? ? nil : self.data['permalink']
    end
  
    def url_friendly_name(data = nil)
      data = data || self.data
      data.nil? || data['url_friendly_name'].nil? || data['url_friendly_name'].strip == '' ? nil : data['url_friendly_name']
    end
  
    private
      # strip characters and whitespace to create valid filenames, also lowercase
      def sanitize_filename(name)
        return name.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
      end
  end

  class DataPagesGenerator < Generator
    safe true

    def generate(site)
      data = site.config['page_gen']

      if data
        data.each do |data_spec|
          # todo: check input data correctness
          template = data_spec['template'] || data_spec['data']
          dir = data_spec['dir'] || data_spec['data']

          if site.layouts.key? template
            records = site.data['_models'].send(data_spec['data'])
            records.each do |record|
              page = DataPage.new(site, site.source, dir, record.data, record.id, template, data_spec['data'])
              site.pages << page
              site.store_page_permalink!(page)
            end
          else
            puts "error. could not find template #{template}"
          end
        end
      end
    end
  end
end
