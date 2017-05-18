from cerberus import Validator
import yaml


group_yaml = '''
    interests:
        type: dict
        keyschema:
            type: string
        valueschema:
            type: integer
            max: 10
            min: 1
                    
    skills_needed:
        type: dict
        keyschema:
            type: string
        valueschema:
            type: integer
            max: 10
            min: 1
                    
    roles_needed:
        type: dict
        keyschema:
            type: string
        valueschema:
            type: integer
            max: 10
            min: 1
'''

schema = yaml.load(group_yaml)
validator = Validator(schema)
