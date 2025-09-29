'use client';

import React from 'react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { useOnChange } from 'fumadocs-core/utils/use-on-change';
import { useI18n } from 'fumadocs-ui/provider';

import {
  SearchDialog,
  TagsList,
  type SharedProps,
  type TagItem,
} from './search';

export interface DefaultSearchDialogProps extends SharedProps {
  /**
   * @defaultValue 'fetch'
   */
  type?: 'fetch' | 'static';

  defaultTag?: string;
  tags?: TagItem[];

  /**
   * Search API URL
   */
  api?: string;

  /**
   * The debounced delay for performing a search.
   */
  delayMs?: number;

  footer?: React.ReactNode;

  /**
   * Allow to clear tag filters
   *
   * @defaultValue false
   */
  allowClear?: boolean;
}

export default function DefaultSearchDialog({
  defaultTag,
  tags,
  api,
  delayMs,
  type = 'fetch',
  allowClear = false,
  ...props
}: DefaultSearchDialogProps): React.ReactNode {
  const { locale } = useI18n();
  const [tag, setTag] = React.useState(defaultTag);
  const { search, setSearch, query } = useDocsSearch(
    type === 'fetch'
      ? {
          type: 'fetch',
          api,
        }
      : {
          type: 'static',
          from: api,
        },
    locale,
    tag,
    delayMs
  );

  useOnChange(defaultTag, (v) => {
    setTag(v);
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      results={query.data ?? []}
      {...props}
      footer={
        tags ? (
          <>
            <TagsList
              tag={tag}
              onTagChange={setTag}
              items={tags}
              allowClear={allowClear}
            />
            {props.footer}
          </>
        ) : (
          props.footer
        )
      }
    />
  );
}
