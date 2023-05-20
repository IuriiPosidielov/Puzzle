from django.db import models

# Create your models here.

class Puzzle(models.Model):
	Question = models.TextField(null=True,blank=True)
	Answer = models.TextField(null=True,blank=True)


	def __str__(self):
		return self.Question
