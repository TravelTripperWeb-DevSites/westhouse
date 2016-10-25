require 'i18n'

module Jekyll
  class TranslateTag < Liquid::Tag
    def initialize(tag_name, token, *args)
      super
      params = token.to_s.strip.split(',')
      @token = eval(params[0].strip)
      @locale = params[1].to_s.strip
      @locale = nil if @locale == ''
    end

    def render(context)
      site = context.registers[:site]
      load_translations(site.source)
      locale = context[@locale] || @locale || site.active_lang || site.default_lang || 'en'
      I18n.available_locales = site.languages || [site.default_lang || 'en']

      I18n.t @token, locale: locale
    end

    private
      def load_translations(path)
        unless I18n::backend.instance_variable_get(:@translations)
          I18n.backend.load_translations Dir[File.join(path, '_locales/*.yml')]
        end
      end
  end
end

Liquid::Template.register_tag('t', Jekyll::TranslateTag)
