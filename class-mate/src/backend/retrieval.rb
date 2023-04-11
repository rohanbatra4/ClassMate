require "sinatra"
require "sinatra/cross_origin"
require "json"
require "google/cloud/firestore"

# Initialize Firestore client
project_id = "classmate-2bc70"
credential_file = "/Users/rohanbatra/Desktop/CS4365/classmate-2bc70-firebase-adminsdk-v075n-fad07d3573.json"
db = Google::Cloud::Firestore.new(
  project_id: project_id,
  credentials: credential_file,
)
collection = "UserClasses"
# set blank dictionary
dictionary = {}
dictionary1 = {}
pushEmail = ""
exist = true
verification = false
check = 0
email2 = ""
verification2 = false

configure do
  enable :cross_origin
  dictionary1 = {}
end

before do
  response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
  response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type"
end

options "*" do
  200
end

post "/verify" do
  puts "Entered the Verify POST block"
  body = request.body.read
  puts body
  dictionary1 = JSON.parse(body)
  verification = true
end

get "/receive" do
  puts "Entered the receive GET block"
  while verification == false
    sleep(1)
  end
  result = []
  check = 0
  count = 1
  exist = true
  verification = false
  if !dictionary1["crns"].nil?
    for value in dictionary1["crns"]
      if value.nil?
        next
      end
      while count < 8
        if (db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value] == nil)
          check += 0
        else
          check += 1
          puts db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value]
          result.push(db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value])
          count = 1
          break
        end
        count += 1
      end
    end
  end
  exist = (check == dictionary1["crns"].length)
  puts exist

  content_type :json
  { result: result, check: check, exist: exist }.to_json
end

get "/receive2" do
  puts "Entered the receive2 GET block"
  result = []
  check = 0
  count = 1
  exist = true
  if !dictionary1["crns"].nil?
    for value in dictionary1["crns"]
      if value.nil?
        next
      end
      while count < 8
        if (db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value] == nil)
          check += 0
        else
          check += 1
          puts db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value]
          result.push(db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value])
          count = 1
          break
        end
        count += 1
      end
    end
  end
  exist = (check == dictionary1["crns"].length)
  puts exist

  content_type :json
  { result: result, check: check, exist: exist }.to_json
end

post "/name" do
  puts "Entered the User POST block"
  body = request.body.read
  puts body
  list = []
  first = []
  dictionary = JSON.parse(body)
  pushEmail = dictionary["emailId"]
  for key in dictionary.keys
    if (key != "emailId")
      email_field_sym = pushEmail.to_sym
      first = db.collection(collection).doc("emails").get.data[email_field_sym]
      if first.nil?
        first = dictionary[key]
      else
        first = first.concat(dictionary[key])
      end
      first = first.uniq
      db.collection(collection).doc("emails").set({ pushEmail => first }, merge: true)
      first = []
      for value in dictionary[key]
        if value.nil?
          next
        end
        value1 = value.to_sym
        list = db.collection("Groups").doc("GTech").get.data[value1]
        if list.nil?
          list = [pushEmail]
        else
          list = list.concat([pushEmail])
        end
        list = list.uniq
        db.collection("Groups").doc("GTech").set({ value => list }, merge: true)
        list = []
      end
    end
  end
end

post "/emailsend" do
  result = []
  puts "Entered the emailsend POST block"
  body = request.body.read
  email2 = JSON.parse(body)
  puts email2
  verification2 = true
end

# use this email2 value to check if in the UserClasses collection, this email exists
# if it does, then return all the fields in the dictionary
# if it does not, then send an error message to the frontend

get "/email" do
  puts "Entered the email GET block"
  result = []
  count = 1
  check = 0
  while !verification2
    sleep(1)
  end
  verification2 = false
  email_field_sym = email2["email"].to_sym
  puts email_field_sym
  puts db.collection(collection).doc("emails").get.data[email_field_sym]
  list = db.collection(collection).doc("emails").get.data[email_field_sym]
  if list.nil?
    error = true
    content_type :json
    return { result: result, crns: list, error: error }.to_json
  end
  for value in list
    if value.nil?
      next
    end
    while count < 8
      if (db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value] == nil)
        check += 0
      else
        check += 1
        result.push(db.collection("CollegeCourseList").doc("GT" + count.to_s).get[value])
        count = 1
        break
      end
      count += 1
    end
  end
  if check == list.length
    puts result
    error = false
    content_type :json
    return { result: result, crns: list, error: error }.to_json
  else
    puts "Unsuccessful"
  end
end

post "/leave" do
  puts "Entered the User leave POST block"
  body = request.body.read
  puts body
  list = []
  first = []
  dictionary = JSON.parse(body)
  pushEmail = email2["email"]
  puts pushEmail
  for key in dictionary.keys
    email_field_sym = pushEmail.to_sym
    first = db.collection(collection).doc("emails").get.data[email_field_sym]
    if first.nil?
      first = []
    else
      first = first - dictionary[key]
    end
    first = first.uniq
    db.collection(collection).doc("emails").set({ pushEmail => first }, merge: true)
    if first.length === 0
      db.collection(collection).doc("emails").update({ pushEmail => db.field_delete })
    end
    first = []
    for value in dictionary[key]
      if value.nil?
        next
      end
      value1 = value.to_sym
      list = db.collection("Groups").doc("GTech").get.data[value1]
      if list.nil?
        list = []
      else
        list = list - [pushEmail]
      end
      list = list.uniq
      db.collection("Groups").doc("GTech").set({ value => list }, merge: true)
      if list.length === 0
        db.collection("Groups").doc("GTech").update({ value => db.field_delete })
      end
      list = []
    end
  end
end
