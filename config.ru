# see http://randomerrata.com/post/56163474367/middleman-on-heroku

require "rubygems"

require "rack"
require "middleman/rack"
require "rack/contrib/try_static"
require 'rack/rewrite'

# require 'rack/ssl-enforcer'
# use Rack::SslEnforcer, :except_hosts => '0.0.0.0'

use Rack::Rewrite do
  r301 %r{\/....\/..\/..\/(.*)}, '/blog/$1'
end

# Build the static site when the app boots
`bundle exec middleman build`

# Enable proper HEAD responses
use Rack::Head
# Attempt to serve static HTML files
use Rack::TryStatic,
    :root => "tmp",
    :urls => %w[/],
    :try => ['.html', 'index.html', '/index.html']

# Serve a 404 page if all else fails
run lambda { |env|
  [
    404,
    {
      "Content-Type"  => "text/html",
      "Cache-Control" => "public, max-age=60"
    },
    File.open("tmp/404/index.html", File::RDONLY)
  ]
}