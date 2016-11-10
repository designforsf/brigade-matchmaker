import unittest

from .. import user


class TestUserSchema(unittest.TestCase):

    example_user = {
        'email': 'person@provider.com',
        'skills': ['python', 'sql', 'nosql', 'web development'],
        'interests': [
            'javascript',
             'front-end',
             'visualization',
             'education',
             'homelessness'
        ],
        'desired_roles': ['engineer', 'project_lead']
    }

    def test_valid_user(self):
        self.assertTrue(user.validator.validate(self.example_user))
