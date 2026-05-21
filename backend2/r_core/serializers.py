from rest_framework import serializers
from r_core.models import Person

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = "__all__"

class RankingSerializer(serializers.Serializer):
    person = PersonSerializer(source="*")
    number_of_deals = serializers.IntegerField()
    total_amount = serializers.IntegerField()
    
