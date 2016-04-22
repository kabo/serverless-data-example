#!/usr/bin/env python
# -*- coding: utf-8 -*- #

import csv, json, argparse, copy

parser = argparse.ArgumentParser(description='Transform a tab-delimited file to DynamoDB PutRequests.')
parser.add_argument('file', help='The file to transform')
args = parser.parse_args()

content = {'readings': []}
with open(args.file, 'rb') as f:
  reader = csv.reader(f, delimiter="\t", quoting=csv.QUOTE_NONE)
  headers = []
  units = []
  rown = 0
  newcontent = copy.deepcopy(content)
  for row in reader:
    if rown == 0:
      for val in row:
        header, unit = val.split('[')
        unit = unit[:-1]
        headers.append(header)
        units.append(unit)
      rown = rown + 1
      continue
    item = {"source": {"S": "Station1"}}
    i = 0
    for val in row:
      if i == 0:
        item['datetime'] = {'S': val}
      else:
        item[headers[i]] = {"M": {"Unit": {"S": units[i]}, "Value": {"N": val.strip()}}}
      i = i + 1
    newcontent['readings'].append({"PutRequest": {"Item": item}})
    rown = rown + 1
    if 0 == (rown % 25):
      with open('batch-%s.json' % rown, 'w') as of:
        json.dump(newcontent, of, indent=2)
      newcontent = copy.deepcopy(content)
with open('batch-%s.json' % rown, 'w') as of:
  json.dump(newcontent, of, indent=2)
