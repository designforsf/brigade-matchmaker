import sys
import pprint
import json
import toml
pp = pprint.PrettyPrinter();
import pymongo
from pymongo import MongoClient

# NOTE: installations required for the javascript-based config system
#import PyV8
#ctx = PyV8.JSContext()
#ctx.enter()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created on Wed Aug 22 19:55:11 PDT 2018

@author: jpitts

Requirements:
    - toml, pymongo need to be installed
    - mongodb needs to be running
    - brigade-matchmaker web needs to be running
        (populates the users table in the brigade-matchmaker collection)

Installation:
		pip3 install pymomgo
		pip3 install toml

"""

# load config file
#file = open("../../etc/development.js","w")
#print(file.read())

# database configuration
collection_name = 'brigade-matchmaker'
client = MongoClient('localhost', 27017)
db = client[collection_name]


# Tree Structure for UI Rendering
# SEE: https://github.com/designforsf/brigade-matchmaker/blob/master/docs/taxonomy.md#tree-structure-for-ui-rendering
tax_dict = {
	"skills": {
		"itemsBySection": {}
	},
	"learnSkills": {
		"itemsBySection": {}
	},
	"interests": {
		"itemsBySection": {}
	}
}

# load the taxonomy data from the database
taxonomies = []
taxonomy_count = 0
for tax in db.projecttaxonomies.find({}):
	#print(tax['parent'], '/', tax['name'])
	taxonomies.append(tax)

# process level 0 - taxonomy root and sections
for tax_index, tax in enumerate(taxonomies):
	
	# remove from tax array
	taxonomies.pop(tax_index)

	for root in tax_dict.keys():
		if tax['parent'] == root:
			
			# legacy clean up
			tax.pop('_id', None)
			tax.pop('className', None)

			tax_dict[root]['itemsBySection'][tax['name']] = tax

			# array for items under this section
			tax_dict[root]['itemsBySection'][tax['name']]['items'] = []

# process level 1 - sections and items

for root in tax_dict.keys():
	print('ROOT: ', root)

	for section in tax_dict[root]['itemsBySection'].keys():
		#print('SECTION: ', section)

		for tax_index, tax in enumerate(taxonomies):
			if tax['parent'] == section:

				# legacy clean up
				tax.pop('_id', None)
				tax.pop('className', None)

				tax_dict[root]['itemsBySection'][section]['items'].append(tax)
				#print('ITEM: ', tax['name'])


# save the toml output
tax_toml = toml.dumps(tax_dict)

print(tax_toml)

