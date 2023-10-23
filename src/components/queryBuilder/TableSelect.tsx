import React, { useState, useEffect } from 'react';
import { Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { Datasource } from '../../data/CHDatasource';
import { selectors } from './../../selectors';
import { EditorField } from '@grafana/experimental';

export type Props = {
  datasource: Datasource;
  database?: string;
  table?: string;
  onTableChange: (value: string) => void;
};

export const TableSelect = (props: Props) => {
  const { datasource, onTableChange, database, table } = props;
  const [list, setList] = useState<Array<SelectableValue<string>>>([]);
  const { label, tooltip } = selectors.components.QueryEditor.QueryBuilder.FROM;
  useEffect(() => {
    async function fetchTables() {
      const translatedLabels = require('./../../../transLabels.json');
      const tables = await datasource.fetchTables(database);
      const values = tables.map((t) => ({ label: t, value: t }));
      for(let i = 0; i < values.length; i++){
        values[i].label = translatedLabels.tables[values[i].label] ?? values[i].label;
      }
      // Add selected value to the list if it does not exist.
      if (table && !tables.find((x) => x === table)) {
        values.push({ label: table!, value: table! });
      }
      setList(values);
    }
    fetchTables();
  }, [datasource, database, table]);

  const onChange = (value: string) => {
    onTableChange(value);
  };

  return (
    <EditorField tooltip={tooltip} label={label}>
      <Select
        onChange={(e) => onChange(e.value ? e.value : '')}
        options={list}
        value={table}
        allowCustomValue={true}
        width={25}
      ></Select>
    </EditorField>
  );
};
