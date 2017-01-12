

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Oct 12 20:30:54 2016

@author: ryanlim
"""

def matchmaking (skills_list, interests_list, roles_list):

    #declare a list with scores for each project
    project_scores = []

    #iterate over the projects
    for project in projects:

        #get the different factors for skills, interests, and roles
        skills_factor = project[skills_factor]
        interests_factor = project[interests_factor]
        roles_factor = project[roles_factor]

        #declare variables to hold the totals for skills, interests, and roles
        skills_total = 0
        interests_total = 0
        roles_total = 0

        '''
        iterate over the skills_list and get the corresponding
        values for each skill and the total value from the project
        '''
        if len(skills_list) > 0:
            for skill in skills_list:
                skills_total += project[skill]
        '''
        iterate over the interests_list and get the corresponding
        values for each interest and the total value from the project
        '''
        if len(interests_list) > 0:
            for interest in interests_list:
                interests_total += project[interest]
        '''
        iterate over the roles_list and get the corresponding
        values for each role and the total value from the project
        '''
        if len(roles_list) > 0:
            for role in roles_list:
                roles_total += project[role]

        #Find the weighted total for the project
        project_total = 0
        project_total += (skills_factor * skills_total)
        project_total += (interest_factor * interests_total)
        project_total += (roles_factor * roles_total)

        #add the weighted total to the project_scores list
        project_scores.append(project_total)

    #create dictionary for project - key and project_score - value and set up values
    project_dict = {}

    index = 0
    while (index < len(projects)):
        project_dict[project[index]] = project_scores[index]
        index += 1
