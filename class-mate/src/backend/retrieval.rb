require 'sinatra'
require 'sinatra/cross_origin'
require 'json'

# set blank dictionary
dictionary = {}

configure do
    enable :cross_origin
  end
  
  before do
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  end
  
  options '*' do
    200
  end
  

  post '/name' do
    puts "Entered the POST block"
    body = request.body.read
    puts body
    dictionary = JSON.parse(body)
    puts "Parsed body into dictionary:"
    for key in dictionary.keys
        puts dictionary[key]
    end
  end

