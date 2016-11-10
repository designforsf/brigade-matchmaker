import copy
import unittest

from .. import group


class TestUserSchema(unittest.TestCase):

    example_group = {
        'interests': {
            'python': 1,
            'javascript': 8
        },
        'skills_needed': {
            'haskell': 6,
            'ux': 3,
            'sql': 8
        },
        'roles_needed': {
            'holy warrior': 8,
            'visionary': 3
        }   
    }

    def test_valid_group(self):
        self.assertTrue(group.validator.validate(self.example_group))

    def test_value_boundaries(self):
        test_group = copy.deepcopy(self.example_group)
        test_group['skills_needed']['ux'] = 11
        self.assertFalse(group.validator.validate(test_group))

        test_group['skills_needed']['ux'] = 10
        self.assertTrue(group.validator.validate(test_group))

        test_group['skills_needed']['ux'] = 1 
        self.assertTrue(group.validator.validate(test_group))
        
        test_group['skills_needed']['ux'] = 0
        self.assertFalse(group.validator.validate(test_group))
