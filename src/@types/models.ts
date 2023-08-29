export type SearchResultsApi = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: {
    key: string;
    type: string;
    seed: string[];
    title: string;
    title_suggest: string;
    title_sort: string;
    edition_count: number;
    edition_key: string[];
    publish_date: string[];
    publish_year: number[];
    first_publish_year: number;
    number_of_pages_median: number;
    lccn: string[];
    publish_place: string[];
    oclc: string[];
    contributor: string[];
    lcc: string[];
    ddc: string[];
    isbn: string[];
    last_modified_i: number;
    ebook_count_i: number;
    ebook_access: string;
    has_fulltext: boolean;
    public_scan_b: boolean;
    ia: string[];
    ia_collection: string;
    ia_collection_s: string;
    lending_edition_s: string;
    lending_identifier_s: string;
    printdisabled_s: string;
    ratings_average: number;
    ratings_sortable: number;
    ratings_count: number;
    ratings_count_1: number;
    ratings_count_2: number;
    ratings_count_3: number;
    ratings_count_4: number;
    ratings_count_5: number;
    readinglog_count: number;
    want_to_read_count: number;
    currently_reading_count: number;
    already_read_count: number;
    cover_edition_key: string;
    cover_i: number;
    first_sentence: string[];
    publisher: string[];
    language: string[];
    author_key: string[];
    author_name: string[];
    author_alternative_name: string[];
    subject: string[];
    id_amazon: string[];
    id_depósito_legal: string[];
    id_goodreads: string[];
    id_librarything: string[];
    id_libris: string[];
    id_overdrive: string[];
    ia_loaded_id: string[];
    ia_box_id: string[];
    publisher_facet: string[];
    subject_facet: string[];
    _version_: number;
    lcc_sort: string;
    author_facet: string[];
    subject_key: string[];
    ddc_sort: string;
  }[];
  num_found: number;
  q: string;
  offset: null;
};

export type BookPropsApi = {
  title: string;
  key: string;
  authors: [
    {
      author: {
        key: string;
      };
      type: {
        key: string;
      };
    },
  ];
  type: {
    key: string;
  };
  description: string;
  covers: number[];
  subject_places: string[];
  subjects: string[];
  subject_people: string[];
  subject_times: string[];
  location: string;
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
};

export type BookProps = {
  key: string;
  cover: string;
  title: string;
  author: string;
  publishYear: number | string;
  description?: string;
};
