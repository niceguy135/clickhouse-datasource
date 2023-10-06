import React from 'react';
import { BuilderMode, CHQuery, Format, QueryType, CHBuilderQuery } from '../types';
import { QueryTypeSwitcher } from 'components/QueryTypeSwitcher';
import { FormatSelect } from '../components/FormatSelect';
import { Button } from '@grafana/ui';
import { getFormat } from 'components/editor';
import { EditorHeader, FlexItem } from '@grafana/experimental';

interface QueryHeaderProps {
  query: CHQuery;
  onChange: (query: CHQuery) => void;
  onRunQuery: () => void;
}

export const QueryHeader = ({ query, onChange, onRunQuery }: QueryHeaderProps) => {
  React.useEffect(() => {
    if (typeof query.selectedFormat === 'undefined' && query.queryType === QueryType.SQL) {
      const selectedFormat = Format.AUTO;
      const format = getFormat(query.rawSql, selectedFormat);
      onChange({ ...query, selectedFormat, format });
    }
  }, [query, onChange]);

  const runQuery = () => {
    if (query.queryType === QueryType.SQL) {
      const format = getFormat(query.rawSql, query.selectedFormat);
      if (format !== query.format) {
        onChange({ ...query, format });
      }
    }
    const translatedFields = require("../components/queryBuilder/transLabels.json");
    const firstFiledsSymbolIndex = query.rawSql.indexOf(" ") + 1; //следующий символ сразу после первого пробела, что сразу после SELECT
    const lastFiledsSymbolIndex = query.rawSql.indexOf("FROM") - 1; //последний символ сразу перед " FROM ..."
    const queryFileds = query.rawSql.slice(
      firstFiledsSymbolIndex,
      lastFiledsSymbolIndex
    ).split(", ");

    for(let i = 0; i < queryFileds.length; i++) {
      const fieldWithoutBrackets = queryFileds[i].slice(1,queryFileds[i].length - 1);
      if( Object.keys(translatedFields.colomns).find( (e: string) => e === fieldWithoutBrackets )) {
        queryFileds[i] = `${queryFileds[i]} AS "${translatedFields.colomns[fieldWithoutBrackets]}"`;
      }
    }
    query.rawSql = `${query.rawSql.slice(0,firstFiledsSymbolIndex - 1)} ${queryFileds.join(", ")} ${query.rawSql.slice(lastFiledsSymbolIndex + 1)}`;
    console.log(query.rawSql)
    onRunQuery();
  };

  const onFormatChange = (selectedFormat: Format) => {
    switch (query.queryType) {
      case QueryType.SQL:
        onChange({ ...query, format: getFormat(query.rawSql, selectedFormat), selectedFormat });
      case QueryType.Builder:
      default:
        if (selectedFormat === Format.AUTO) {
          let builderOptions = (query as CHBuilderQuery).builderOptions;
          const format = builderOptions && builderOptions.mode === BuilderMode.Trend ? Format.TIMESERIES : Format.TABLE;
          onChange({ ...query, format, selectedFormat });
        } else {
          onChange({ ...query, format: selectedFormat, selectedFormat });
        }
    }
  };

  return (
    <EditorHeader>
      <QueryTypeSwitcher query={query} onChange={onChange} />
      <FlexItem grow={1} />
      <Button variant="primary" icon="play" size="sm" onClick={runQuery}>
        Run query
      </Button>
      <FormatSelect format={query.selectedFormat ?? Format.AUTO} onChange={onFormatChange} />
    </EditorHeader>
  );
};
