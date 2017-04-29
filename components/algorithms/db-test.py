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

import time
import pymongo
from pymongo import MongoClient

collection_name = 'heroku_f5vtn572'


time.sleep(1)
print
print "IMPORTANT NOTE: to load projects, first run the web app!"
time.sleep(3)

print
print "Connect to " + collection_name

'''
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

client = MongoClient('ds123331.mlab.com', 23331)
'''
client = MongoClient('mongodb://heroku_f5vtn572:3v2pc1pn1ulp3j9d34s445r3j6@ds123331.mlab.com:23331/heroku_f5vtn572')
db = client[collection_name]


print
print 'db.projects.count() = ' + str(db.projects.count())

print
print 'db.projects.find() = '

for project in db.projects.find({}):
    print project['name']
    for needType in ["interestsNeeded","skillsNeeded","rolesNeeded"]:
        print " " + needType + ":"
        for need in project['matchingConfig'][needType]:
            print " + " + need
    print
