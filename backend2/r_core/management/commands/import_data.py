from django.core.management.base import BaseCommand, CommandError, CommandParser
import json, re
from r_core.models import BusinessCase, Person
from django.db import transaction
# from polls.models import Question as Poll


def _snake_to_camel(inputstring):
    REG = r"(.*?)_([a-zA-Z])"
    def patternrepl(match):
        return match.group(1).lower() + match.group(2).upper()
    result = re.sub(REG, patternrepl, inputstring, 0)
    return result

class Command(BaseCommand):
    help = "Import data"

    _case_fields = ["id", "code", "name", "total_amount_in_default_currency", "trading_profit", "status", "exchange_rate"]
    _person_fields = ["full_name", "full_name_without_titles", "first_name" , "last_name", "title_after", "title_before"]

    def add_arguments(self, parser: CommandParser):
        parser.add_argument("file", nargs=1, type=str)

    @transaction.atomic
    def handle(self, *args, **options):
        # print(options["file"])
        with open(options["file"][0]) as f:
            cases = json.load(f)

        num = 0
        for case in cases["data"]:
            owner_kwargs = {py_name: case["owner"][_snake_to_camel(py_name)] for py_name in self._person_fields}
            owner, _ = Person.objects.get_or_create(id=case["owner"]["id"], defaults=owner_kwargs)

            case_kwargs = {py_name: case[_snake_to_camel(py_name)] for py_name in self._case_fields}
            BusinessCase.objects.create(
                **case_kwargs,
                owner=owner
            )
            num += 1
        
        self.stdout.write(f"created {num} business cases")




        # for poll_id in options["poll_ids"]:
        #     try:
        #         poll = Poll.objects.get(pk=poll_id)
        #     except Poll.DoesNotExist:
        #         raise CommandError('Poll "%s" does not exist' % poll_id)

        #     poll.opened = False
        #     poll.save()

        #     self.stdout.write(
        #         self.style.SUCCESS('Successfully closed poll "%s"' % poll_id)
        #     )
