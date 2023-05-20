from rest_framework import serializers
from .models import Puzzle

class PuzzleSerializer(serializers.ModelSerializer):
	class Meta:
		model = Puzzle
		fields = ['id', 'Question', 'Answer']
