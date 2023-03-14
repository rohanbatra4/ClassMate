require "google/cloud/firestore"
require "csv"

# Initialize Firestore client
project_id = "classmate-2bc70"
credential_file = "/Users/rohanbatra/Desktop/CS4365/classmate-2bc70-firebase-adminsdk-v075n-fad07d3573.json"
db = Google::Cloud::Firestore.new(
  project_id: project_id,
  credentials: credential_file
)
csv_file_path = "/Users/rohanbatra/Desktop/CS4365/CourseList.csv"

# Parse the CSV file
csv_data = CSV.read(csv_file_path)
collection = "CollegeCourseList"
document = "GT"
count = 0
csv_data.each do |row|
  key = row[1]  # Get the key from the CRN column
  value1 = row[0]  # Get the first value from the Course column
  value2 = row[2]  # Get the second value from the Title column
  if key != nil and key != "CRN" and key.scan(/\D/).empty? and (22000 >= key.to_i and key.to_i >= 20000) # add key with two values
    # store all key-value pairs in first document
    db.collection(collection).doc(document + "1").set({key => [value1, value2]}, merge: true)
    count += 1
  end
  if key != nil and key != "CRN" and key.scan(/\D/).empty? and (24000 >= key.to_i and key.to_i > 22000) # add key with two values
    # store all key-value pairs in second document
    db.collection(collection).doc(document + "2").set({key => [value1, value2]}, merge: true)
    count += 1
  end
  if key != nil and key != "CRN" and key.scan(/\D/).empty? and (26000 >= key.to_i and key.to_i > 24000) # add key with two values
    # store all key-value pairs in third document
    db.collection(collection).doc(document + "3").set({key => [value1, value2]}, merge: true)
    count += 1
  end
  if key != nil and key != "CRN" and key.scan(/\D/).empty? and (28000 >= key.to_i and key.to_i > 26000) # add key with two values
    # store all key-value pairs in fourth document
    db.collection(collection).doc(document + "4").set({key => [value1, value2]}, merge: true)
    count += 1
  end
  if key != nil and key != "CRN" and key.scan(/\D/).empty? and (30000 >= key.to_i and key.to_i > 28000) # add key with two values
    # store all key-value pairs in fifth document
    db.collection(collection).doc(document + "5").set({key => [value1, value2]}, merge: true)
    count += 1
  end
  if key != nil and key != "CRN" and key.scan(/\D/).empty? and (32000 >= key.to_i and key.to_i > 30000) # add key with two values
    # store all key-value pairs in sixth document
    db.collection(collection).doc(document + "6").set({key => [value1, value2]}, merge: true)
    count += 1
  end
  if key != nil and key != "CRN" and key.scan(/\D/).empty? and (36000 >= key.to_i and key.to_i > 32000) # add key with two values
    # store all key-value pairs in seventh document
    db.collection(collection).doc(document + "7").set({key => [value1, value2]}, merge: true)
    count += 1
  end
end
puts "Added #{count} pairs to the #{collection} collection." # check if 12651 rows are added
