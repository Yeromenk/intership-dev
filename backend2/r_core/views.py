from django.shortcuts import render
from rest_framework.generics import ListAPIView
from r_core.models import Person, BusinessCase
from r_core.serializers import PersonSerializer, RankingSerializer
from django.db.models import Q, Sum, Count

# Create your views here.
class GetRankingView(ListAPIView):
    queryset = Person.objects.annotate(
        number_of_deals=Count("owned_business_cases__id"),
        total_amount=Sum("owned_business_cases__total_amount_in_default_currency")
    ).order_by("-total_amount")[:10]

    serializer_class = RankingSerializer
