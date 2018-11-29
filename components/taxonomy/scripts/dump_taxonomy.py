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
import pprint
import toml
from pymongo import MongoClient

class DumpTaxonomy:
    """ Dumps the Taxonomy from MongoDB """
    db = MongoClient('localhost', 27017)['brigade-matchmaker']


# Tree structure for ui rendering
# see: https://git.io/fxjgz
    def __init__(self):
        self.source = [item for item in self.db.projecttaxonomies.find({}) if item['parent']]
        self.tax = {}

    def create_taxonomy_dict(self):
        """ Create the dict for building the TOML """
        for row in self.source:
            self.tax[self.build_name(row)] = {'synonyms': row['synonyms'], 'title': row['title']}

    def dump_toml(self):
        """ Actually dump the TOML """
        self.create_taxonomy_dict()
        return toml.dumps(self.tax)

    def build_name(self, row):
        """ Add the slashes to the name """
        parent_name = next((item for item in self.source if item['name'] == row['parent']), row['parent'])
        if not type(parent_name) == dict:
            return parent_name + '/' + row['name']
        return self.build_name(parent_name) + '/' + row['name']

TAXONOMY = DumpTaxonomy()
print(TAXONOMY.dump_toml())
