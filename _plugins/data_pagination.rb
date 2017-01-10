module Jekyll
  module DataPaginate
    class DataPagination < Generator
      # This generator is safe from arbitrary code execution.
      safe true

      # This generator should be passive with regard to its execution
      priority :lowest

      # Generate paginated pages if necessary.
      #
      # site - The Site.
      #
      # Returns nothing.
      def generate(site)
        if DataPager.pagination_enabled?(site)
          template = self.class.template_page(site)
          models = self.class.models(site)
          if template
            if models
              paginate(site, models, template)
            else
              Jekyll.logger.warn "DataPagination:", "DataPagination is enabled, but I couldn't find " +
              "a model to use as the pagination template. Skipping pagination."
            end
          else
            Jekyll.logger.warn "DataPagination:", "Pagination is enabled, but I couldn't find " +
            "an index.html page to use as the pagination template. Skipping pagination."
          end
        end
      end

      # Paginates the blog's posts. Renders the index.html file into paginated
      # directories, e.g.: page2/index.html, page3/index.html, etc and adds more
      # site-wide data.
      #
      # site - The Site.
      # page - The index.html Page that requires pagination.
      #
      # {"data_paginator" => { "page" => <Number>,
      #                   "per_page" => <Number>,
      #                   "posts" => [<Post>],
      #                   "total_posts" => <Number>,
      #                   "total_pages" => <Number>,
      #                   "previous_page" => <Number>,
      #                   "next_page" => <Number> }}
      def paginate(site, models, page)
        all_posts = models #.reject { |post| post['hidden'] }
        pages = DataPager.calculate_pages(all_posts, site.config['data_paginate']['per_page'].to_i)
        (1..pages).each do |num_page|
          pager = DataPager.new(site, num_page, all_posts, pages)
          if num_page > 1
            newpage = Page.new(site, site.source, page.dir, page.name)
            newpage.data_pager = pager
            newpage.dir = DataPager.paginate_path(site, num_page)
            site.pages << newpage
          else
            page.data_pager = pager
          end
        end
      end

      # Static: Fetch the URL of the template page. Used to determine the
      #         path to the first pager in the series.
      #
      # site - the Jekyll::Site object
      #
      # Returns the url of the template page
      def self.first_page_url(site)
        if page = DataPagination.template_page(site)
          page.url
        else
          nil
        end
      end

      # Public: Find the Jekyll::Page which will act as the pager template
      #
      # site - the Jekyll::Site object
      #
      # Returns the Jekyll::Page which will act as the pager template
      def self.template_page(site)
        explicit_page = site.config['data_paginate'] && site.config['data_paginate']['pagination_template']
        if explicit_page
          site.pages.each do |page| 
            return page if page.path.to_s == explicit_page.to_s
          end
        end
        
        site.pages.select do |page|
          DataPager.pagination_candidate?(site.config, page)
        end.sort do |one, two|
          two.path.size <=> one.path.size
        end.first
      end

      def self.models(site)
        model_name = site.config['data_paginate'] && site.config['data_paginate']['data']
        sort_field = (site.config['data_paginate'] && site.config['data_paginate']['sort_field']) || 'date'
        reverse = (site.config['data_paginate'] && site.config['data_paginate']['sort_reverse']) || false
        if model_name && site.data && site.data['_models']
          models = site.data['_models'][model_name] || []
          models.sort! {|x,y| x[sort_field]<=>y[sort_field] }
          if reverse
            models.reverse!
          else
            models
          end
        else
          return nil
        end
      end

    end
  end
end