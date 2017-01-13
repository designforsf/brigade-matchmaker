'''

    @author: jpitts

    Requirements:
        - pymongo needs to be installed
        - mongodb needs to be running
        - brigade-matchmaker web needs to be running
            (populates the users table in the brigade-matchmaker collection)

    For installation instructions:
    http://api.mongodb.com/python/current/installation.html

    For the API:
    http://api.mongodb.com/python/current/api/pymongo/collection.html

    Install dependencies:
        python -m pip install pymongo

    Usage:
        python ./db-test.py

'''

import pymongo
from pymongo import MongoClient

collection_name = 'brigade-matchmaker'

print "Connect to " + collection_name

client = MongoClient('localhost', 27017)
db = client[collection_name]

print
print 'db.users.count() = ' + str(db.users.count())

print
print 'db.users.find() = '

for doc in db.users.find({}):
    print doc
