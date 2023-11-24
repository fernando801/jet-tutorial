import { h } from "preact";
import { useState } from "preact/hooks";
import { ojSelectSingle } from '@oracle/oraclejet/ojselectsingle';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'oj-c/select-single';

const activities = [
    { value: 'Baseball', label: 'Baseball' },
    { value: 'Bicycling', label: 'Bicycling' },
    { value: 'Skiing', label: 'Skiing' },
    { value: 'Soccer', label: 'Soccer' },
  ];

export function Dashboard() {
  const [selectedActivity, setSelectedActivity] = useState<string>('Baseball');
  const dataProvider = new ArrayDataProvider(activities, { keyAttributes: 'value' });

  const valueChanged = ( event: ojSelectSingle.valueChanged<string, string> ) => {
    setSelectedActivity( event.detail.value ?? 'No activity selected' );
  }

  return (
    <div>
    <oj-c-select-single
        labelHint='Select an Activity'
        data={dataProvider}
        itemText={"label"}
        onvalueChanged={valueChanged}
        value={selectedActivity}
    ></oj-c-select-single>
    <p>{selectedActivity}</p>
    </div>
  );
};