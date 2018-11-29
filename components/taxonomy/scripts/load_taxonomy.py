"""
Created on Wed Aug 22 19:55:11 PDT 2018
@author: rickpr
Requirements:
    - toml, pymongo need to be installed
    - mongodb needs to be running

Installation:
                pip3 install pymomgo
                pip3 install toml
"""
import sys
from pymongo import MongoClient
import toml

#!/usr/bin/env python3
# -*- coding: utf-8 -*-

class LoadTaxonomy:
    """ Creates JSON from TOML and loads it into MongoDB """
    database_name = 'brigade-matchmaker'
    client = MongoClient('localhost', 27017)
    db = client[database_name]

    def __init__(self, toml_filename='taxonomy.toml'):
        # load the taxonomy data from the TOML file, and create JSON
        self.taxonomy_toml = toml.load(toml_filename)

    def taxonomy_json(self):
        """ Create the JSON to put into MongoDB """
        fixed_dict = [ self.add_parent(key, value) for key, value in self.taxonomy_toml.items() ]
        return fixed_dict

    def load_taxonomy(self):
        """ Load the JSON into the database. Dangerous! """
        self.db.projecttaxonomies.drop()
        for row in self.taxonomy_json():
            self.db.projecttaxonomies.insert_one(row)
        return True

    def add_parent(self, key, value):
        """ Add the parent for the Mongo Entry """
        split_key = key.split('/')
        value['name'] = split_key[-1]
        value['parent'] = split_key[-2] if len(split_key) > 1 else None
        return value

# When calling from command line, you may specify input and output file
TOML_FILE = sys.argv[1] if len(sys.argv) >= 2 else 'taxonomy.toml'

LOADER = LoadTaxonomy(TOML_FILE)
LOADER.load_taxonomy()
