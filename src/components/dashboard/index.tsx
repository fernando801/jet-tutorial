import { h } from "preact";
import { useState, useMemo } from "preact/hooks";
import { ojSelectSingle } from '@oracle/oraclejet/ojselectsingle';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'oj-c/select-single';
import 'ojs/ojchart';
import "ojs/ojlistview";
import "ojs/ojlistitemlayout";
import { ojChart } from 'ojs/ojchart';
import { ojListView } from 'ojs/ojlistview';
import * as dataText from 'text!./data.json'
const data = JSON.parse(dataText)

const activities = [
    { value: 'Baseball', label: 'Baseball' },
    { value: 'Bicycling', label: 'Bicycling' },
    { value: 'Skiing', label: 'Skiing' },
    { value: 'Soccer', label: 'Soccer' },
  ];

function ChartItemTemplate( item: ojChart.ItemTemplateContext ) {
    console.log(item.data)
    return (
        <oj-chart-item
            value={item.data.quantity}
            seriesId={item.data.name}
            groupId={["prod"]}
        >
        </oj-chart-item>
    );
}

function ListItemTemplate( item: ojListView.ItemTemplateContext ) {
    console.log(item.data)
    return (
        <oj-list-item-layout>
            <span >{item.data.name}</span>
            <span slot="secondary">Quantity: {item.data.quantity}</span>
        </oj-list-item-layout>
    );
}
export function Dashboard() {
  const [selectedActivity, setSelectedActivity] = useState<string>('Baseball');
  const dataProvider = new ArrayDataProvider(activities, { keyAttributes: 'value' });

  const productsDataProvider = useMemo(() => {

    return new ArrayDataProvider(data[selectedActivity], {
        keyAttributes: 'id',
    })

  }, [selectedActivity, setSelectedActivity])

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
    <oj-chart
        id="pieChart"
        type="pie"
        data={productsDataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
    >
        <template slot="itemTemplate" render={ChartItemTemplate} />
    </oj-chart>
    <oj-list-view
        data={productsDataProvider}
    >
        <template slot="itemTemplate" render={ListItemTemplate} />
    </oj-list-view>
    </div>
  );
};