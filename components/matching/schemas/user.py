from cerberus import Validator
import yaml


user_yaml = '''
    email:
        type: string
        regex: (^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)
        empty: False
        
    skills:
        type: list
        
    interests:
        type: list
        
    desired_roles:
        type: list
'''

schema = yaml.load(user_yaml)
validator = Validator(schema)
