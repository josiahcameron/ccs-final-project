from django.contrib.auth import get_user_model

from rest_framework import serializers

from . import models


class HabitSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Habit
        fields = '__all__'


# class HabitMetaSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.HabitMeta
#         fields = '__all__'


# class HabitsSerializer(serializers.ModelSerializer):
#     # Will give the keys from the habit meta model when creating the habit instance
#     # habit_meta = HabitMetaSerializer()

#     class Meta:
#         model = models.Habit
#         fields = '__all__'

#     def create(self, validated_data):
#         habit = models.Habit.objects.create(**validated_data)

#         habit_meta = HabitMetaSerializer()

#             habit_meta_data = validated_data.pop('habit_meta')
#             print(habit_meta_data)
#             habit = models.Habit.objects.create(**validated_data)
#             # Will create an instance of HabitMeta to correspond to the instance of the habit that was just created
#             models.HabitMeta.objects.create(habit=habit)
#             print(validated_data)
#         return self.title
