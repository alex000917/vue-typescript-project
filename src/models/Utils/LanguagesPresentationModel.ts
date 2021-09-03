import { KeyValue } from "../KeyValue"

import { AppCacheModule } from "@/store/modules/appCache"

export class LanguagesPresentationModel {
  public static readonly PRIMARY_LANGUAGE_INITIALS: string = "en";

  public static readonly RECENT_DOCUMENTS: string = "RECENT_DOCUMENTS";

  public static readonly NO_RECENT_DOCUMENTS_EXPLANATION: string =
    "NO_RECENT_DOCUMENTS_EXPLANATION";

  public static readonly YES: string = "YES";

  public static readonly NO: string = "NO";

  public static readonly SAVE_SUCCESS: string = "SAVE_SUCCESS";

  public static readonly SAVE_FAILED: string = "SAVE_FAILED";

  public static readonly TABLE: string = "TABLE";

  public static readonly LOOKUP: string = "LOOKUP";

  public static readonly OF: string = "OF";

  public static readonly TO_LOWER_CASE: string = "TO_LOWER_CASE";

  public static readonly OK: string = "OK";

  public static readonly IS: string = "IS";

  public static readonly IATTACHMENTSSETHOLDER_ATTACHMENTS_DISPLAY_NAME: string =
    "IATTACHMENTSSETHOLDER_ATTACHMENTS_DISPLAY_NAME";

  public static readonly INDEXPOSITIONABLE_INDEXPOSITION_DISPLAY_NAME: string =
    "INDEXPOSITIONABLE_INDEXPOSITION_DISPLAY_NAME";

  public static readonly ITREE_CHILDREN_DISPLAY_NAME: string =
    "ITREE_CHILDREN_DISPLAY_NAME";

  public static readonly ITREE_PARENT_DISPLAY_NAME: string =
    "ITREE_PARENT_DISPLAY_NAME";

  public static readonly ITREE_PATH_DISPLAY_NAME: string =
    "ITREE_PATH_DISPLAY_NAME";

  public static readonly ITREETABLE_SEQUENCE_DISPLAY_NAME: string =
    "ITREETABLE_SEQUENCE_DISPLAY_NAME";

  public static readonly ITREETABLE_LEVELINTREE_DISPLAY_NAME: string =
    "ITREETABLE_LEVELINTREE_DISPLAY_NAME";

  public static readonly PERSISTENCEBASEDTO_CREATIONUSER_DISPLAY_NAME: string =
    "PERSISTENCEBASEDTO_CREATIONUSER_DISPLAY_NAME";

  public static readonly STATUSDTO_STATUS_DISPLAY_NAME: string =
    "STATUSDTO_STATUS_DISPLAY_NAME";

  public static readonly CATEGORIZABLE_ENTITYCATEGORY_DISPLAY_NAME: string =
    "CATEGORIZABLE_ENTITYCATEGORY_DISPLAY_NAME";

  public static readonly STATUSDTO_PREVIOUSSTATUS_DISPLAY_NAME: string =
    "STATUSDTO_PREVIOUSSTATUS_DISPLAY_NAME";

  public static readonly STATUSDTO_PREVIOUSSTEPID_DISPLAY_NAME: string =
    "STATUSDTO_PREVIOUSSTEPID_DISPLAY_NAME";

  public static readonly STATUSDTO_PREVIOUSFLOWSTEPID_DISPLAY_NAME: string =
    "STATUSDTO_PREVIOUSFLOWSTEPID_DISPLAY_NAME";

  public static readonly PERSISTENCEBASEDTO_ID_DISPLAY_NAME: string =
    "PERSISTENCEBASEDTO_ID_DISPLAY_NAME";

  public static readonly WORKFLOWABLE_WORKFLOWID_DISPLAY_NAME: string =
    "WORKFLOWABLE_WORKFLOWID_DISPLAY_NAME";

  public static readonly PERSISTENCEBASEDTO_STATE_DISPLAY_NAME: string =
    "PERSISTENCEBASEDTO_STATE_DISPLAY_NAME";

  public static readonly WORKFLOWABLE_CURRENTSTEPDESCRIPTION_DISPLAY_NAME: string =
    "WORKFLOWABLE_CURRENTSTEPDESCRIPTION_DISPLAY_NAME";

  public static readonly PERSISTENCEBASEDTO_UPDATEUSER_DISPLAY_NAME: string =
    "PERSISTENCEBASEDTO_UPDATEUSER_DISPLAY_NAME";

  public static readonly PERSISTENCEBASEDTO_TIMEUPDATED_DISPLAY_NAME: string =
    "PERSISTENCEBASEDTO_TIMEUPDATED_DISPLAY_NAME";

  public static readonly PERSISTENCEBASEDTO_TIMECREATED_DISPLAY_NAME: string =
    "PERSISTENCEBASEDTO_TIMECREATED_DISPLAY_NAME";

  public static readonly STATUSDTO_PREVIOUSSTEPDESCRIPTION_DISPLAY_NAME: string =
    "STATUSDTO_PREVIOUSSTEPDESCRIPTION_DISPLAY_NAME";

  public static readonly STATUSDTO_PREVIOUSFLOWSTEPDESCRIPTION_DISPLAY_NAME: string =
    "STATUSDTO_PREVIOUSFLOWSTEPDESCRIPTION_DISPLAY_NAME";

  public static readonly WORKFLOWABLE_CURRENTSTEPID_DISPLAY_NAME: string =
    "WORKFLOWABLE_CURRENTSTEPID_DISPLAY_NAME";

  public static readonly STATUSDTO_LASTTIMESTATUSCHANGED_DISPLAY_NAME: string =
    "STATUSDTO_LASTTIMESTATUSCHANGED_DISPLAY_NAME";

  public static readonly ATTACHMENT_DISPLAY_NAME: string =
    "ATTACHMENT_DISPLAY_NAME";

  public static readonly USER_DISPLAY_NAME: string = "USER_DISPLAY_NAME";

  public static readonly ENTITYCATEGORY_DISPLAY_NAME: string =
    "ENTITYCATEGORY_DISPLAY_NAME";

  public static readonly STATUS_DISPLAY_NAME: string = "STATUS_DISPLAY_NAME";

  public static readonly DEFAULT_FORMAT_SETTINGS: string =
    "DEFAULT_FORMAT_SETTINGS";

  public static readonly DEFAULT_FORMAT_SETTINGS_HELP_TEXT: string =
    "DEFAULT_FORMAT_SETTINGS_HELP_TEXT";

  public static readonly DEFAULT_COLUMNS_OF_TABLES: string =
    "DEFAULT_COLUMNS_OF_TABLES";

  public static readonly TAB: string = "TAB";

  public static readonly NEW_TAB_TOOLTIP: string = "NEW_TAB_TOOLTIP";

  public static readonly SECTION: string = "SECTION";

  public static readonly REPORT: string = "REPORT";

  public static readonly NEW_REPORT_TOOLTIP: string = "NEW_REPORT_TOOLTIP";

  public static readonly NEW_SECTION_TOOLTIP: string = "NEW_SECTION_TOOLTIP";

  public static readonly WORKFLOWABLE_ASSIGNEE_USER_DISPLAY_NAME: string =
    "WORKFLOWABLE_ASSIGNEE_USER_DISPLAY_NAME";

  public static readonly AVAILABLE_FORMS: string = "AVAILABLE_FORMS";

  public static readonly AVAILABLE_WORKFLOWS: string = "AVAILABLE_WORKFLOWS";

  /** ************************** Header **************************/
  public static readonly REVERT_WARNING: string = "REVERT_WARNING";

  public static readonly WARNING_TITLE: string = "WARNING_TITLE";

  public static readonly SAVE: string = "SAVE";

  public static readonly SAVE_TOOLTIP: string = "SAVE_TOOLTIP";

  public static readonly REVERT: string = "REVERT";

  public static readonly REVERT_TOOLTIP: string = "REVERT_TOOLTIP";

  /** ************************** View Pane **************************/
  public static readonly FIND_ENTITY: string = "FIND_ENTITY";

  public static readonly FILTER_BY_FREE_TEXT: string = "FILTER_BY_FREE_TEXT";

  public static readonly FIND_DISCIPLINE: string = "FIND_DISCIPLINE";

  public static readonly FIND_DISCIPLINE_TOOLTIP: string =
    "FIND_DISCIPLINE_TOOLTIP";

  public static readonly ADDED_PROPERTIES: string = "ADDED_PROPERTIES";

  public static readonly WORKING_PANE_DEFAULT_TEXT: string =
    "WORKING_PANE_DEFAULT_TEXT";

  public static readonly EDITABLE_LABEL_DEFAULT_TEXT: string =
    "EDITABLE_LABEL_DEFAULT_TEXT";

  public static readonly EDITABLE_LABEL_DEFAULT_DESCRIPTION: string =
    "EDITABLE_LABEL_DEFAULT_DESCRIPTION";

  public static readonly DISPLAY_NAME: string = "DISPLAY_NAME";

  public static readonly DESCRIPTION: string = "DESCRIPTION";

  public static readonly ADVANCED_SETTINGS: string = "ADVANCED_SETTINGS";

  public static readonly DISCIPLINE: string = "DISCIPLINE";

  public static readonly CHOOSE_DISCIPLINE: string = "CHOOSE_DISCIPLINE";

  public static readonly CONFIGURATION_SUPPORT: string =
    "CONFIGURATION_SUPPORT";

  public static readonly FORM_DEFINITION_SUPPORT: string =
    "FORM_DEFINITION_SUPPORT";

  public static readonly WORKFLOW_SUPPORT: string = "WORKFLOW_SUPPORT";

  public static readonly ATTACHMENT_SUPPORT: string = "ATTACHMENT_SUPPORT";

  public static readonly TREE_SUPPORT: string = "TREE_SUPPORT";

  public static readonly REORDER_SUPPORT: string = "REORDER_SUPPORT";

  public static readonly MANDATORY: string = "MANDATORY";

  public static readonly NOTES: string = "NOTES";

  public static readonly SYSTEM_NAME: string = "SYSTEM_NAME_LABEL";

  public static readonly SQL_CONNECTION: string = "SQL_CONNECTION";

  public static readonly DB_TABLE_NAME: string = "DB_TABLE_NAME";

  public static readonly PROPERTIES_LIST: string = "PROPERTIES_LIST";

  public static readonly SETTINGS: string = "SETTINGS";

  public static readonly MOVE_UP: string = "MOVE_UP";

  public static readonly MOVE_DOWN: string = "MOVE_DOWN";

  public static readonly FORM_SETTINGS: string = "FORM_SETTINGS";

  public static readonly TAB_SETTINGS: string = "TAB_SETTINGS";

  public static readonly NEW_ITEM: string = "NEW_ITEM";

  public static readonly NEW_PROPERTY_TOOLTIP: string = "NEW_PROPERTY_TOOLTIP";

  public static readonly NEW_ENTITY_TOOLTIP: string = "NEW_ENTITY_TOOLTIP";

  public static readonly NEW_FORMULA: string = "NEW_FORMULA";

  public static readonly NEW_FORMULA_TOOLTIP: string = "NEW_FORMULA_TOOLTIP";

  public static readonly NEW_VIRTUAL: string = "NEW_VIRTUAL";

  public static readonly NEW_VIRTUAL_ENTITY: string = "NEW_VIRTUAL_ENTITY";

  public static readonly NEW_VIRTUAL_TOOLTIP: string = "NEW_VIRTUAL_TOOLTIP";

  public static readonly FIND_PROPERTY: string = "FIND_PROPERTY";

  public static readonly FILTER_BY_DATA_TYPE: string = "FILTER_BY_DATA_TYPE";

  public static readonly FILTER_BY_DATA_TYPE_TOOLTIP: string =
    "FILTER_BY_DATA_TYPE_TOOLTIP";

  public static readonly ENTITIES: string = "ENTITIES";

  public static readonly ENTITY: string = "ENTITY";

  public static readonly RECENT_ITEMS: string = "RECENT_ITEMS";

  public static readonly ENTITIES_EDITOR: string = "ENTITIES_EDITOR";

  public static readonly FORMS_EDITOR: string = "FORMS_EDITOR";

  public static readonly WORKFLOWS: string = "WORKFLOWS";

  public static readonly AUTHORIZATION_EDITOR: string = "AUTHORIZATION_EDITOR";

  public static readonly EDITORS_LIST_TITLE: string = "EDITORS_LIST_TITLE";

  public static readonly ENTITIES_EDITOR_TITLE: string =
    "ENTITIES_EDITOR_TITLE";

  public static readonly CHOOSE_SQL_CONNECTION: string =
    "CHOOSE_SQL_CONNECTION";

  public static readonly ENTITY_SYSTEM_NAME_INPUT_HELP: string =
    "ENTITY_SYSTEM_NAME_INPUT_HELP";

  public static readonly DB_TABLE_NAME_INPUT_HELP: string =
    "DB_TABLE_NAME_INPUT_HELP";

  public static readonly DB_COLUMN_NAME_INPUT_HELP: string =
    "DB_COLUMN_NAME_INPUT_HELP";

  public static readonly PROPERTY_SYSTEM_NAME_INPUT_HELP: string =
    "PROPERTY_SYSTEM_NAME_INPUT_HELP";

  public static readonly CREATE: string = "CREATE";

  public static readonly UPDATE: string = "UPDATE";

  public static readonly ORDER_BY: string = "ORDER_BY";

  public static readonly ROW_FILTER: string = "ROW_FILTER";

  public static readonly DB_KEY_COL_NAME: string = "DB_KEY_COL_NAME";

  public static readonly DB_COL_NAME: string = "DB_COL_NAME";

  public static readonly REF_TABLE_NAME: string = "REF_TABLE_NAME";

  public static readonly DB_COL_DATA_TYPE: string = "DB_COL_DATA_TYPE";

  public static readonly DB_REF_COL_NAME: string = "DB_REF_COL_NAME";

  public static readonly DATA_TYPE: string = "DATA_TYPE";

  public static readonly SQL_QUERY: string = "SQL_QUERY";

  public static readonly ENTER_SQL: string = "ENTER_SQL";

  public static readonly MORE_INFO: string = "MORE_INFO";

  public static readonly MORE: string = "MORE";

  public static readonly NOT_EMPTY: string = "NOT_EMPTY";

  public static readonly CHOICE: string = "CHOICE";

  public static readonly CHOICE_DESCRIPTION: string = "CHOICE_DESCRIPTION";

  public static readonly CANCEL: string = "CANCEL";

  public static readonly RETURN_TO_PROPERTIES_LIST: string =
    "RETURN_TO_PROPERTIES_LIST";

  public static readonly ENTER_SQL_QUERY: string = "ENTER_SQL_QUERY";

  public static readonly SQL_DESCRIPTION: string = "SQL_DESCRIPTION";

  public static readonly PROPERTIES_DATA_TYPES: string =
    "PROPERTIES_DATA_TYPES";

  public static readonly CHOOSE_DATA_TYPE: string = "CHOOSE_DATA_TYPE";

  public static readonly PREPARE_PROPERTIES_LIST: string =
    "PREPARE_PROPERTIES_LIST";

  public static readonly OR: string = "OR";

  public static readonly ADD: string = "ADD";

  public static readonly PROPERTIES: string = "PROPERTIES";

  public static readonly RETURNED_BY_SQL: string = "RETURNED_BY_SQL";

  public static readonly EDIT_SQL_QUERY: string = "EDIT_SQL_QUERY";

  public static readonly RETURN_TO_SETTINGS: string = "RETURN_TO_SETTINGS";

  public static readonly SQL_QUERY_FORMULA_PROPERTY_HELP: string =
    "SQL_QUERY_FORMULA_PROPERTY_HELP";

  public static readonly REFERENCE_TABLE: string = "REFERENCE_TABLE";

  public static readonly REFERENCE_COLUMN: string = "REFERENCE_COLUMN";

  public static readonly DATABASE_KEY_COLUMN_NAME: string =
    "DATABASE_KEY_COLUMN_NAME";

  public static readonly DELETE_ENTITY_WARNING: string =
    "DELETE_ENTITY_WARNING";

  public static readonly LEAVE_EDITED_ENTITY_WARNING: string =
    "LEAVE_EDITED_ENTITY_WARNING";

  public static readonly LEAVE_NEW_PROPERTY_WARNING: string =
    "LEAVE_NEW_PROPERTY_WARNING";

  public static readonly UNDEFINED_ENTITY: string = "UNDEFINED_ENTITY";

  public static readonly DELETE_ENTITY_TOOLTIP: string =
    "DELETE_ENTITY_TOOLTIP";

  public static readonly DELETE_PROPERTY_WARNING: string =
    "DELETE_PROPERTY_WARNING";

  public static readonly UNIQUE_ID: string = "UNIQUE_ID";

  public static readonly SINGLE_LINE_OF_TEXT: string = "SINGLE_LINE_OF_TEXT";

  public static readonly NUMBER: string = "NUMBER";

  public static readonly LARGE_NUMBER: string = "LARGE_NUMBER";

  public static readonly DATE_AND_TIME: string = "DATE_AND_TIME";

  public static readonly CHOOSE_PROPERTY: string = "CHOOSE_PROPERTY";

  public static readonly SELECT_IDENTIFIER_PROPERTY: string =
    "SELECT_IDENTIFIER_PROPERTY";

  public static readonly SOLUTION_DESIGNER: string = "SOLUTION_DESIGNER";

  public static readonly NEW_ENTITY: string = "NEW_ENTITY";

  public static readonly ADD_PROPERTY: string = "ADD_PROPERTY";

  public static readonly DRAG_PROPERTIES: string = "DRAG_PROPERTIES";

  public static readonly FIND_DATA_TYPE: string = "FIND_DATA_TYPE";

  public static readonly MOVE_TO_TAB: string = "MOVE_TO_TAB";

  public static readonly MOVE_TO_MORE_INFO: string = "MOVE_TO_MORE_INFO";

  public static readonly MOVE_TO_TABLE: string = "MOVE_TO_TABLE";

  public static readonly DELETE_CONTROL: string = "DELETE_CONTROL";

  public static readonly DELETE_MORE_INFO: string = "DELETE_MORE_INFO";

  public static readonly DELETE_FORM: string = "DELETE_FORM";

  public static readonly DELETE_TAB: string = "DELETE_TAB";

  public static readonly DELETE_SECTION: string = "DELETE_SECTION";

  public static readonly ADD_NEW_TAB: string = "ADD_NEW_TAB";

  public static readonly ADD_NEW_SECTION: string = "ADD_NEW_SECTION";

  public static readonly ADD_NEW_REPORT: string = "ADD_NEW_REPORT";

  public static readonly ADD_NEW_TABLE: string = "ADD_NEW_TABLE";

  public static readonly ADD_TAB: string = "ADD_TAB";

  public static readonly DISPLAY: string = "DISPLAY";

  public static readonly FORMAT: string = "FORMAT";

  public static readonly VIEWED_BY: string = "VIEWED_BY";

  public static readonly EXPAND_THIS_SECTION_BY_DEFAULT: string =
    "EXPAND_THIS_SECTION_BY_DEFAULT";

  public static readonly EDITED_BY: string = "EDITED_BY";

  public static readonly TABLE_EDITED_BY: string = "TABLE_EDITED_BY";

  public static readonly ROW_EDITED_BY: string = "ROW_EDITED_BY";

  public static readonly ADVANCED: string = "ADVANCED";

  public static readonly THIS_FORM_IS_BASED_ON_THE_ENTITY: string =
    "THIS_FORM_IS_BASED_ON_THE_ENTITY";

  public static readonly THIS_OBJECT_IS_BASED: string = "THIS_OBJECT_IS_BASED";

  public static readonly THIS_REPORT_IS_BASED: string = "THIS_REPORT_IS_BASED";

  public static readonly PROPERTY: string = "PROPERTY";

  public static readonly SHOW_PROPERTY_HISTORY: string =
    "SHOW_PROPERTY_HISTORY";

  public static readonly SHOW_ROW_HISTORY: string = "SHOW_ROW_HISTORY";

  public static readonly SET_OBJECT_INSTRUCTION_LINE: string =
    "SET_OBJECT_INSTRUCTION_LINE";

  public static readonly DISPLAY_NAME_AND_DESCRIPTION: string =
    "DISPLAY_NAME_AND_DESCRIPTION";

  public static readonly SET_FORM_DISPLAY_NAME: string =
    "SET_FORM_DISPLAY_NAME";

  public static readonly SET_OBJECT_DISPLAY_NAME: string =
    "SET_OBJECT_DISPLAY_NAME";

  public static readonly SET_TAB_DISPLAY_NAME: string = "SET_TAB_DISPLAY_NAME";

  public static readonly SET_TABLE_DISPLAY_NAME: string =
    "SET_TABLE_DISPLAY_NAME";

  public static readonly WIDTH: string = "WIDTH";

  public static readonly READ_ONLY: string = "READ_ONLY";

  public static readonly ADD_NEW_TAB_TITLE: string = "ADD_NEW_TAB_TITLE";

  public static readonly OPEN_EXISTING_FORM: string = "OPEN_EXISTING_FORM";

  public static readonly OPEN_EXISTING_WORKFLOW: string =
    "OPEN_EXISTING_WORKFLOW";

  public static readonly CREATE_NEW_BLANK_WORKFLOW: string =
    "CREATE_NEW_BLANK_WORKFLOW";

  public static readonly FORM: string = "FORM";

  public static readonly FORMS: string = "FORMS";

  public static readonly OPEN: string = "OPEN";

  public static readonly CHANGE_DEFAULT_SETTINGS: string =
    "CHANGE_DEFAULT_SETTINGS";

  public static readonly RESTRICT_VIEWING_FROM: string =
    "RESTRICT_VIEWING_FROM";

  public static readonly RESTRICT_VIEWING_TAB: string = "RESTRICT_VIEWING_TAB";

  public static readonly RESTRICT_VIEWING_SECTION: string =
    "RESTRICT_VIEWING_SECTION";

  public static readonly RESTRICT_VIEWING_CONTROL: string =
    "RESTRICT_VIEWING_CONTROL";

  public static readonly RESTRICT_VIEWING_REPORT: string =
    "RESTRICT_VIEWING_REPORT";

  public static readonly RESTRICT_EDITING_FROM: string =
    "RESTRICT_EDITING_FROM";

  public static readonly RESTRICT_EDITING_TAB: string = "RESTRICT_EDITING_TAB";

  public static readonly RESTRICT_EDITING_SECTION: string =
    "RESTRICT_EDITING_SECTION";

  public static readonly RESTRICT_EDITING_CONTROL: string =
    "RESTRICT_EDITING_CONTROL";

  public static readonly RESTRICT_EDITING_TABLE: string =
    "RESTRICT_EDITING_TABLE";

  public static readonly RESTRICT_EDITING_TABLE_ROWS: string =
    "RESTRICT_EDITING_TABLE_ROWS";

  public static readonly EDITING_A_ROW_CAN_BE_DONE: string =
    "EDITING_A_ROW_CAN_BE_DONE";

  public static readonly DELETING_A_ROW_CAN_BE_DONE: string =
    "DELETING_A_ROW_CAN_BE_DONE";

  public static readonly USE_ROLE_GROUP: string = "USE_ROLE_GROUP";

  public static readonly OVERRIDE_CONDITIONS: string = "OVERRIDE_CONDITIONS";

  public static readonly NEW_ROLE_GROUP: string = "NEW_ROLE_GROUP";

  public static readonly EDIT_ROLE_GROUP: string = "EDIT_ROLE_GROUP";

  public static readonly NEW_CONDITION: string = "NEW_CONDITION";

  public static readonly EDIT: string = "EDIT";

  public static readonly CLONE: string = "CLONE";

  public static readonly COPY: string = "COPY";

  public static readonly DELETE: string = "DELETE";

  public static readonly FORMAT_TEXT: string = "FORMAT_TEXT";

  public static readonly FORMAT_NUMBERS: string = "FORMAT_NUMBERS";

  public static readonly FORMAT_DATE_AND_TIME: string = "FORMAT_DATE_AND_TIME";

  public static readonly MAXIMUM_TEXT_SIZE: string = "MAXIMUM_TEXT_SIZE";

  public static readonly LEAVE_EMPTY_FOR_MAX: string = "LEAVE_EMPTY_FOR_MAX";

  public static readonly USE_THE_FOLLOWING_FORMAT: string =
    "USE_THE_FOLLOWING_FORMAT";

  public static readonly USE_SEPARATOR: string = "USE_SEPARATOR";

  public static readonly DECIMAL_PLACES: string = "DECIMAL_PLACES";

  public static readonly TYPE: string = "TYPE";

  public static readonly DO_NOT_DELETE: string = "DO_NOT_DELETE";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_FORM: string =
    "DO_YOU_WANT_TO_DELETE_THE_FORM";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_TAB: string =
    "DO_YOU_WANT_TO_DELETE_THE_TAB";

  public static readonly DELETING_A_FORM_CANNOT_BE_UNDONE: string =
    "DELETING_A_FORM_CANNOT_BE_UNDONE";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_CONTROL: string =
    "DO_YOU_WANT_TO_DELETE_THE_CONTROL";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_MORE_INFO: string =
    "DO_YOU_WANT_TO_DELETE_THE_MORE_INFO";

  public static readonly DELETING_A_CONTROL_WILL_NOT_DELETE_FROM_DB: string =
    "DELETING_A_CONTROL_WILL_NOT_DELETE_FROM_DB";

  public static readonly DELETING_A_MORE_INFO_WILL_NOT_DELETE_FROM_DB: string =
    "DELETING_A_MORE_INFO_WILL_NOT_DELETE_FROM_DB";

  public static readonly CHANGE_DEFAULT: string = "CHANGE_DEFAULT";

  public static readonly DEFAULT_SETTINGS_AFFECT: string =
    "DEFAULT_SETTINGS_AFFECT";

  public static readonly ENTER_NEW_FORM_NAME: string = "ENTER_NEW_FORM_NAME";

  public static readonly ENTER_NEW_WORKFLOW_NAME: string =
    "ENTER_NEW_WORKFLOW_NAME";

  public static readonly ENTER_TAB_NAME: string = "ENTER_TAB_NAME";

  public static readonly SELECT_FORM: string = "SELECT_FORM";

  public static readonly SELECT_WORKFLOW: string = "SELECT_WORKFLOW";

  public static readonly FORMATTING: string = "FROMATTING";

  public static readonly DISPLAY_NAME_AND_TOOLTIP: string =
    "DISPLAY_NAME_AND_TOOLTIP";

  public static readonly USE_FOLLOWING_DISPLAY_NAME_AND_TOOLTIP: string =
    "USE_FOLLOWING_DISPLAY_NAME_AND_TOOLTIP";

  public static readonly TOOLTIP: string = "TOOLTIP";

  public static readonly SELECT_PROPERTY: string = "SELECT_PROPERTY";

  public static readonly PROPERTIES_IN_A_LINE: string = "PROPERTIES_IN_A_LINE";

  public static readonly LOGGED_IN_USER: string = "LOGGED_IN_USER";

  public static readonly CHOOSE_A: string = "CHOOSE_A";

  public static readonly STATUS: string = "STATUS";

  public static readonly ENTITY_CATEGORY: string = "ENTITY_CATEGORY";

  public static readonly CONDITION: string = "CONDITION";

  public static readonly OF_THE: string = "OF_THE";

  public static readonly ENTER: string = "ENTER";

  public static readonly PROPERTY_CONDITION: string = "PROPERTY_CONDITION";

  public static readonly COMPARE_A_PROPERTY_TO: string =
    "COMPARE_A_PROPERTY_TO";

  public static readonly SKIP_IF: string = "SKIP_IF";

  public static readonly IS_EMPTY: string = "IS_EMPTY";

  public static readonly TYPE_TEXT: string = "TYPE_TEXT";

  public static readonly CHOOSE_OPTIONS: string = "CHOOSE_OPTIONS";

  public static readonly TYPE_DATE_AND_TIME: string = "TYPE_DATE_AND_TIME";

  public static readonly TYPE_A_NUMBER: string = "TYPE_A_NUMBER";

  public static readonly ADD_EVERYONE: string = "ADD_EVERYONE";

  public static readonly SKIP_THIS_CONDITION_IF: string =
    "SKIP_THIS_CONDITION_IF";

  public static readonly FIRST_TAB_NAME: string = "FIRST_TAB_NAME";

  public static readonly SELECT_TAB_TO_MOVE: string = "SELECT_TAB_TO_MOVE";

  public static readonly MOVE_CONTROL: string = "MOVE_CONTROL";

  public static readonly MOVE: string = "MOVE";

  public static readonly TAB_MUST_BE_SELECTED: string = "TAB_MUST_BE_SELECTED";

  public static readonly ERROR: string = "ERROR";

  public static readonly COLUMN: string = "COLUMN";

  public static readonly PROPERTY_PATH: string = "PROPERTY_PATH";

  public static readonly STATUS_CONDITION: string = "STATUS_CONDITION";

  public static readonly ENTITY_CATEGORY_CONDITION: string =
    "ENTITY_CATEGORY_CONDITION";

  public static readonly JAVASCRIPT_CONDITION: string = "JAVASCRIPT_CONDITION";

  public static readonly DISPLAY_ITEMS_IN_DROP_DOWN: string =
    "DISPLAY_ITEMS_IN_DROP_DOWN";

  public static readonly DISPLAY_ITEMS_IN_DROP_DOWN_TOOLTIP: string =
    "DISPLAY_ITEMS_IN_DROP_DOWN_TOOLTIP";

  public static readonly USE_THE_FOLLOWING_ITEM_FORMAT: string =
    "USE_THE_FOLLOWING_ITEM_FORMAT";

  public static readonly INSERT_PROPERTY: string = "INSERT_PROPERTY";

  public static readonly DISPLAY_ONLY_THE_ITEMS: string =
    "DISPLAY_ONLY_THE_ITEMS";

  public static readonly DISPLAY_ONLY_ROWS: string = "DISPLAY_ONLY_ROWS";

  public static readonly FILTER: string = "FILTER";

  public static readonly NEW_FILTER: string = "NEW_FILTER";

  public static readonly SORT: string = "SORT";

  public static readonly SORT_BY: string = "SORT_BY";

  public static readonly ASCENDING: string = "ASCENDING";

  public static readonly DESCENDING: string = "DESCENDING";

  public static readonly COLUMNS: string = "COLUMNS";

  public static readonly LINK: string = "LINK";

  public static readonly EVERYONE: string = "EVERYONE";

  public static readonly EMPTY: string = "EMPTY";

  public static readonly ATTACHMENTS: string = "ATTACHMENTS";

  public static readonly MESSAGES: string = "MESSAGES";

  public static readonly HISTORY: string = "HISTORY";

  public static readonly USE_THE_FOLLOWING_DISPLAY: string =
    "USE_THE_FOLLOWING_DISPLAY";

  public static readonly STATE_FILTER: string = "STATE_FILTER";

  public static readonly STATUS_FILTER: string = "STATUS_FILTER";

  public static readonly ENTITY_CATEGORY_FILTER: string =
    "ENTITY_CATEGORY_FILTER";

  public static readonly ROLE_FILTER: string = "ROLE_FILTER";

  public static readonly SQL_FILTER: string = "SQL_FILTER";

  public static readonly PROPERTY_FILTER: string = "PROPERTY_FILTER";

  public static readonly STATE_IS: string = "STATE_IS";

  public static readonly FILTER_BY_STATE: string = "FILTER_BY_STATE";

  public static readonly USER_IS_ASSIGNED: string = "USER_IS_ASSIGNED";

  public static readonly THE_CONTROL_CAN_BE_A_LINK: string =
    "THE_CONTROL_CAN_BE_A_LINK";

  public static readonly USE_THE_FOLLOWING_LINK_SETTINGS: string =
    "USE_THE_FOLLOWING_LINK_SETTINGS";

  public static readonly NO_LINK: string = "NO_LINK";

  public static readonly LINK_TO_ENTITY_FORM: string = "LINK_TO_ENTITY_FORM";

  public static readonly CUSTOM_LINK: string = "CUSTOM_LINK";

  public static readonly USER_IS_ASSIGNED_TO_ROLE: string =
    "USER_IS_ASSIGNED_TO_ROLE";

  public static readonly CHOOSE_COLUMNS: string = "CHOOSE_COLUMNS";

  public static readonly USE_THE_FOLLOWING_COLUMNS_SETTINGS: string =
    "USE_THE_FOLLOWING_COLUMNS_SETTINGS";

  public static readonly DRAG_ITEMS_TO_REORDER: string =
    "DRAG_ITEMS_TO_REORDER";

  public static readonly HEADER: string = "HEADER";

  public static readonly EDIT_FORMS_HEADER: string = "EDIT_FORMS_HEADER";

  public static readonly INSERT: string = "INSERT";

  public static readonly LAYOUT: string = "LAYOUT";

  public static readonly TABLES: string = "TABLES";

  public static readonly GRID_CONTAINER_PROPERTIES: string =
    "GRID_CONTAINER_PROPERTIES";

  public static readonly DEVELOPMENT: string = "DEVELOPMENT";

  public static readonly NO_SELECTED_ITEM: string = "NO_SELECTED_ITEM";

  public static readonly DROP_PROPERTIES: string = "DROP_PROPERTIES";

  public static readonly DROP_REPORT_PROPERTIES: string =
    "DROP_REPORT_PROPERTIES";

  public static readonly DROP_TABLE_PROPERTIES: string =
    "DROP_TABLE_PROPERTIES";

  public static readonly DROP_TABLES: string = "DROP_TABLES";

  public static readonly ENTER_JS_CODE: string = "ENTER_JS_CODE";

  public static readonly ENTER_SQL_WHERE: string = "ENTER_SQL_WHERE";

  public static readonly DEFAULT_NAME_FORMAT: string = "DEFAULT_NAME_FORMAT";

  public static readonly PROPERTIES_CAN_BE_LINKS: string =
    "PROPERTIES_CAN_BE_LINKS";

  public static readonly USE_THE_FOLLOWING_VALUE: string =
    "USE_THE_FOLLOWING_VALUE";

  public static readonly DEFAULT_VALUE: string = "DEFAULT_VALUE";

  public static readonly CHECKED: string = "CHECKED";

  public static readonly UNCHECKED: string = "UNCHECKED";

  public static readonly TYPE_NUMBER: string = "TYPE_NUMBER";

  public static readonly TYPE_ID_NUMBER: string = "TYPE_ID_NUMBER";

  public static readonly TODAY: string = "TODAY";

  public static readonly DEFAULT: string = "DEFAULT";

  public static readonly INCLUDE_BLANK_OPTION: string = "INCLUDE_BLANK_OPTION";

  public static readonly BLANK_OPTION_EXAMPLES: string =
    "BLANK_OPTION_EXAMPLES";

  public static readonly DATA_ENTRY: string = "DATA_ENTRY";

  public static readonly MAX_MIN: string = "MAX_MIN";

  public static readonly MAXIMUM_AND_MINIMUM_LIMITS: string =
    "MAXIMUM_AND_MINIMUM_LIMITS";

  public static readonly MUST_BE_AT_LEAST: string = "MUST_BE_AT_LEAST";

  public static readonly MUST_BE_AT_MOST: string = "MUST_BE_AT_MOST";

  public static readonly MUST_BE_BEFORE: string = "MUST_BE_BEFORE";

  public static readonly MUST_BE_AFTER: string = "MUST_BE_AFTER";

  public static readonly NO_LIMIT: string = "NO_LIMIT";

  public static readonly LIMIT_THE_RANGE_OF_POSSIBLE_VALUES_FOR_THIS_PROPERTY: string =
    "LIMIT_THE_RANGE_OF_POSSIBLE_VALUES_FOR_THIS_PROPERTY";

  public static readonly USE_THE_FOLLOWING_INSTEAD_OF_THE_DEFAULT_SETTING: string =
    "USE_THE_FOLLOWING_INSTEAD_OF_THE_DEFAULT_SETTING";

  public static readonly CHOOSE_WHEN_TO_MANDATE: string =
    "CHOOSE_WHEN_TO_MANDATE";

  public static readonly WHEN_FOLLOWING_PROPERTY_EMPTY: string =
    "WHEN_FOLLOWING_PROPERTY_EMPTY";

  public static readonly COPY_VALUES: string = "COPY_VALUES";

  public static readonly AFTER_USER_CHANGES_VALUE_COPY_THIS_TO_OTHER_PROPERTY: string =
    "AFTER_USER_CHANGES_VALUE_COPY_THIS_TO_OTHER_PROPERTY";

  public static readonly NEW_VALUE: string = "NEW_VALUE";

  public static readonly REMOVE: string = "REMOVE";

  public static readonly DONT_REMOVE: string = "DONT_REMOVE";

  public static readonly DO_YOU_WANT_TO_REMOVE: string =
    "DO_YOU_WANT_TO_REMOVE";

  public static readonly BLANK: string = "BLANK";

  public static readonly COPY_FROM: string = "COPY_FROM";

  public static readonly COPY_VALUE: string = "COPY_VALUE";

  public static readonly ADD_SIDE_STEP: string = "ADD_SIDE_STEP";

  public static readonly CREATE_STEP_BEFORE: string = "CREATE_STEP_BEFORE";

  public static readonly CREATE_STEP_AFTER: string = "CREATE_STEP_AFTER";

  public static readonly SHOW_TRANSITIONS: string = "SHOW_TRANSITIONS";

  public static readonly CHOOSE_PROPERTY_TO_COPY_VALUE_TO: string =
    "CHOOSE_PROPERTY_TO_COPY_VALUE_TO";

  public static readonly COLUMNS_CELLS_MUST_SUM_TO: string =
    "COLUMNS_CELLS_MUST_SUM_TO";

  public static readonly CUSTOM_ERROR_MESSAGE: string = "CUSTOM_ERROR_MESSAGE";

  public static readonly CONDITION_PROPERTY_PLACED_IN_FORM_MESSAGE: string =
    "CONDITION_PROPERTY_PLACED_IN_FORM_MESSAGE";

  public static readonly MUST_HAVE_AT_LEAST: string = "MUST_HAVE_AT_LEAST";

  public static readonly ROWS: string = "ROWS";

  public static readonly TABLE_ROWS: string = "TABLE_ROWS";

  public static readonly ADDING_A_ROW_CAN_BE_DONE: string =
    "ADDING_A_ROW_CAN_BE_DONE";

  public static readonly ANYONE_WHO_CAN_EDIT_THE_TABLE: string =
    "ANYONE_WHO_CAN_EDIT_THE_TABLE";

  public static readonly ANYONE_WHO_CAN_EDIT_THE_ROW: string =
    "ANYONE_WHO_CAN_EDIT_THE_ROW";

  public static readonly USERS_WHO_PASS_THE_FOLLOWING_CONDITIONS: string =
    "USERS_WHO_PASS_THE_FOLLOWING_CONDITIONS";

  public static readonly NO_ONE: string = "NO_ONE";

  public static readonly ROW_EDITING_AND_DELETING: string =
    "ROW_EDITING_AND_DELETING";

  public static readonly ALLOW_ROWS_REORDER: string = "ALLOW_ROWS_REORDER";

  public static readonly TO_ENABLE_ROWS_REORDER: string =
    "TO_ENABLE_ROWS_REORDER";

  public static readonly ROW: string = "ROW";

  public static readonly SET_SECTION_DISPLAY_NAME: string =
    "SET_SECTION_DISPLAY_NAME";

  public static readonly EDIT_BY_NOTIFICATION_TEXT: string =
    "EDIT_BY_NOTIFICATION_TEXT";

  public static readonly CONTROL_CANT_BE_EDITED: string =
    "CONTROL_CANT_BE_EDITED";

  public static readonly CONTROL_CANT_BE_VIEWED: string =
    "CONTROL_CANT_BE_VIEWED";

  public static readonly CONTROL_EDITABLE_BECAUSE_EVERYONE: string =
    "CONTROL_EDITABLE_BECAUSE_EVERYONE";

  public static readonly CONTROL_VIEWABLE_BECAUSE_EVERYONE: string =
    "CONTROL_VIEWABLE_BECAUSE_EVERYONE";

  public static readonly OPEN_COLUMN_SETTINGS: string = "OPEN_COLUMN_SETTINGS";

  public static readonly MOVE_COLUMN_TO_MORE_INFO: string =
    "MOVE_COLUMN_TO_MORE_INFO";

  public static readonly DELETE_COLUMN: string = "DELETE_COLUMN";

  public static readonly LEAVE_EMPTY_TO_AUTO_FIT: string =
    "LEAVE_EMPTY_TO_AUTO_FIT";

  public static readonly SET_REPORT_DISPLAY_NAME: string =
    "SET_REPORT_DISPLAY_NAME";

  public static readonly IS_EQUAL_TO: string = "IS_EQUAL_TO";

  public static readonly IS_NOT_EQUAL_TO: string = "IS_NOT_EQUAL_TO";

  public static readonly CONTAINS: string = "CONTAINS";

  public static readonly DOES_NOT_CONTAIN: string = "DOES_NOT_CONTAIN";

  public static readonly BEGINS_WITH: string = "BEGINS_WITH";

  public static readonly DOES_NOT_BEGIN_WITH: string = "DOES_NOT_BEGIN_WITH";

  public static readonly ENDS_WITH: string = "ENDS_WITH";

  public static readonly DOES_NOT_END_WITH: string = "DOES_NOT_END_WITH";

  public static readonly IS_NOT_EMPTY: string = "IS_NOT_EMPTY";

  public static readonly IS_LESS_THAN: string = "IS_LESS_THAN";

  public static readonly IS_LESS_THAN_OR_EQUAL_TO: string =
    "IS_LESS_THAN_OR_EQUAL_TO";

  public static readonly IS_GREATER_THAN: string = "IS_GREATER_THAN";

  public static readonly IS_GREATER_THAN_OR_EQUAL_TO: string =
    "IS_GREATER_THAN_OR_EQUAL_TO";

  public static readonly IS_PRIOR_TO: string = "IS_PRIOR_TO";

  public static readonly IS_PRIOR_TO_OR_EQUAL_TO: string =
    "IS_PRIOR_TO_OR_EQUAL_TO";

  public static readonly IS_LATER_THAN: string = "IS_LATER_THAN";

  public static readonly IS_LATER_THAN_OR_EQUAL_TO: string =
    "IS_LATER_THAN_OR_EQUAL_TO";

  public static readonly IS_CONTAINED_IN: string = "IS_CONTAINED_IN";

  public static readonly IS_NOT_CONTAINED_IN: string = "IS_NOT_CONTAINED_IN";

  public static readonly DELETE_REPORT: string = "DELETE_REPORT";

  public static readonly DELETE_TABLE: string = "DELETE_TABLE";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_TABLE: string =
    "DO_YOU_WANT_TO_DELETE_THE_TABLE";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_SECTION: string =
    "DO_YOU_WANT_TO_DELETE_THE_SECTION";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_REPORT: string =
    "DO_YOU_WANT_TO_DELETE_THE_REPORT";

  public static readonly ADD_MORE_INFO_COLUMN: string = "ADD_MORE_INFO_COLUMN";

  public static readonly CLOSE: string = "CLOSE";

  public static readonly EDIT_FORM_OF: string = "EDIT_FORM_OF";

  public static readonly OPEN_MORE_INFO: string = "OPEN_MORE_INFO";

  public static readonly ADD_ROLE: string = "ADD_ROLE";

  public static readonly ADD_STEP: string = "ADD_STEP";

  public static readonly OF_TYPE: string = "OF_TYPE";

  public static readonly ALL_PROPERTIES: string = "ALL_PROPERTIES";

  public static readonly ALL_COLUMN_PROPERTIES: string =
    "ALL_COLUMN_PROPERTIES";

  public static readonly ALL_PROPERTIES_TOOLTIP: string =
    "ALL_PROPERTIES_TOOLTIP";

  public static readonly ALL_COLUMN_PROPERTIES_TOOLTIP: string =
    "ALL_COLUMN_PROPERTIES_TOOLTIP";

  public static readonly APPLICATION_PREFERENCES: string =
    "APPLICATION_PREFERENCES";

  public static readonly ADD_A_PROPERTY_TO_THE_FORM: string =
    "ADD_A_PROPERTY_TO_THE_FORM";

  public static readonly THE_PROPERTY_WILL_BE_INSERTED: string =
    "THE_PROPERTY_WILL_BE_INSERTED";

  public static readonly THE_PROPERTY_IS_ALREADY_ON_THE_FORM: string =
    "THE_PROPERTY_IS_ALREADY_ON_THE_FORM";

  public static readonly DISPLAY_NAME_SINGULAR: string =
    "DISPLAY_NAME_SINGULAR";

  public static readonly DISPLAY_NAME_PLURAL: string = "DISPLAY_NAME_PLURAL";

  public static readonly DISPLAY_NAME_SINGULAR_INPUT_HELP: string =
    "DISPLAY_NAME_SINGULAR_INPUT_HELP";

  public static readonly DISPLAY_NAME_PLURAL_INPUT_HELP: string =
    "DISPLAY_NAME_PLURAL_INPUT_HELP";

  public static readonly OPTIONAL: string = "OPTIONAL";

  public static readonly NEW_TABLE: string = "NEW_TABLE";

  public static readonly CREATE_NEW_TABLE_PROPERTY: string =
    "CREATE_NEW_TABLE_PROPERTY";

  public static readonly TABLE_ENTITY: string = "TABLE_ENTITY";

  public static readonly EXISTING_ENTITY: string = "EXISTING_ENTITY";

  public static readonly EXISTING_ENTITY_BUTTON_HELPER: string =
    "EXISTING_ENTITY_BUTTON_HELPER";

  public static readonly NEW_ENTITY_BUTTON_HELPER: string =
    "NEW_ENTITY_BUTTON_HELPER";

  public static readonly CHOOSE_TABLE_ENTITY: string = "CHOOSE_TABLE_ENTITY";

  public static readonly INFORMATION_SECTION: string = "INFORMATION_SECTION";

  public static readonly INFORMATION_SECTION_TOOLTIP: string =
    "INFORMATION_SECTION_TOOLTIP";

  public static readonly INFORMATION_SECTION_HEADER: string =
    "INFORMATION_SECTION_HEADER";

  public static readonly INFORMATION_GROUP: string = "INFORMATION_GROUP";

  public static readonly NEW_INFORMATION_GROUP: string =
    "NEW_INFORMATION_GROUP";

  public static readonly DELETE_GROUP: string = "DELETE_GROUP";

  public static readonly ENTER_DISPLAY_NAME_INFORMATION_GROUP: string =
    "ENTER_DISPLAY_NAME_INFORMATION_GROUP";

  public static readonly NEW_PROPERTY: string = "NEW_PROPERTY";

  public static readonly CREATE_AND_NEW: string = "CREATE_AND_NEW";

  public static readonly CREATE_AND_CLOSE: string = "CREATE_AND_CLOSE";

  public static readonly SELECT_INFORMATION_GROUP: string =
    "SELECT_INFORMATION_GROUP";

  public static readonly SELECT_INFORMATION_GROUP_TOOLTIP: string =
    "SELECT_INFORMATION_GROUP_TOOLTIP";

  public static readonly DELETE_INFORMATION_SECTION: string =
    "DELETE_INFORMATION_SECTION";

  public static readonly DELETE_INFORMATION_GROUP: string =
    "DELETE_INFORMATION_GROUP";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_INFORMATION_SECTION: string =
    "DO_YOU_WANT_TO_DELETE_THE_INFORMATION_SECTION";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_INFORMATION_GROUP: string =
    "DO_YOU_WANT_TO_DELETE_THE_INFORMATION_GROUP";

  public static readonly MOVE_INFORMATION_SECTION: string =
    "MOVE_INFORMATION_SECTION";

  public static readonly MOVE_CONTAINER: string = "MOVE_CONTAINER";

  public static readonly FORM_MUST_CONTAIN_TABS: string =
    "FORM_MUST_CONTAIN_TABS";

  public static readonly ALERT: string = "ALERT";

  public static readonly SELECT_TAB_TO_MOVE_SECTION: string =
    "SELECT_TAB_TO_MOVE_SECTION";

  public static readonly INFORMATION_GROUPS_IN_A_ROW: string =
    "INFORMATION_GROUPS_IN_A_ROW";

  public static readonly SET_INFORMATION_GROUP_DISPLAY: string =
    "SET_INFORMATION_GROUP_DISPLAY";

  public static readonly ADD_PROPERTY_TO_THE_INFORMATION_GROUP: string =
    "ADD_PROPERTY_TO_THE_INFORMATION_GROUP";

  public static readonly DELETE_INFORMATION_PROPERTY: string =
    "DELETE_INFORMATION_PROPERTY";

  public static readonly OPEN_INFORMATION_PROPERTY_SETTINGS: string =
    "OPEN_INFORMATION_PROPERTY_SETTINGS";

  public static readonly LINK_TO_TAB: string = "LINK_TO_TAB";

  public static readonly THE_INFORMATION_PROPERTY_CANT_BE_A_LINK: string =
    "THE_INFORMATION_PROPERTY_CANT_BE_A_LINK";

  public static readonly USE_THE_FOLLOWING_XML_EXTENSIONS: string =
    "USE_THE_FOLLOWING_XML_EXTENSIONS";

  public static readonly ATTRIBUTES: string = "ATTRIBUTES";

  public static readonly CHILD_ELEMENTS: string = "CHILD_ELEMENTS";

  public static readonly XML_EXTENSIONS: string = "XML_EXTENSIONS";

  public static readonly XML_CONTROL: string = "XML_CONTROL";

  public static readonly XML_CONTROL_TOOLTIP: string = "XML_CONTROL_TOOLTIP";

  public static readonly XML_COLUMN: string = "XML_COLUMN";

  public static readonly XML_COLUMN_TOOLTIP: string = "XML_COLUMN_TOOLTIP";

  public static readonly XML_SECTION: string = "XML_SECTION";

  public static readonly XML_SECTION_TOOLTIP: string = "XML_SECTION_TOOLTIP";

  public static readonly NEW_XML_CONTROL: string = "NEW_XML_CONTROL";

  public static readonly NEW_XML_SECTION: string = "NEW_XML_SECTION";

  public static readonly XML: string = "XML";

  public static readonly USE_THE_FOLLOWING_TO_CONFIGURE_CONTROL_USING_XML: string =
    "USE_THE_FOLLOWING_TO_CONFIGURE_CONTROL_USING_XML";

  public static readonly USE_THE_FOLLOWING_TO_CONFIGURE_SECTION_USING_XML: string =
    "USE_THE_FOLLOWING_TO_CONFIGURE_SECTION_USING_XML";

  public static readonly XML_CONTENT: string = "XML_CONTENT";

  public static readonly FOR_LAYOUT_PREVIEW_ONLY: string =
    "FOR_LAYOUT_PREVIEW_ONLY";

  public static readonly WORKFLOW_GRAPH: string = "WORKFLOW_GRAPH";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_WORKFLOW_GRAPH: string =
    "DO_YOU_WANT_TO_DELETE_THE_WORKFLOW_GRAPH";

  public static readonly TABLE_DISPLAY_NAME: string = "TABLE_DISPLAY_NAME";

  public static readonly TABLE_DESCRIPTION: string = "TABLE_DESCRIPTION";

  public static readonly TABLE_PROPERTY_SYSTEM_NAME: string =
    "TABLE_PROPERTY_SYSTEM_NAME";

  public static readonly TABLE_PROPERTY_SYSTEM_NAME_HELP: string =
    "TABLE_PROPERTY_SYSTEM_NAME_HELP";

  public static readonly DB_KEY_COL_NAME_HELP: string = "DB_KEY_COL_NAME_HELP";

  public static readonly ENTITY_SYSTEM_NAME: string = "ENTITY_SYSTEM_NAME";

  public static readonly PROPERTY_SYSTEM_NAME: string = "PROPERTY_SYSTEM_NAME";

  public static readonly NEW_COLUMN_PROPERTY_HEADER: string =
    "NEW_COLUMN_PROPERTY_HEADER";

  public static readonly NEW_COLUMN_PROPERTY: string = "NEW_COLUMN_PROPERTY";

  public static readonly VALUE: string = "VALUE";

  public static readonly SELECT_APPLICATION_PREFERENCE: string =
    "SELECT_APPLICATION_PREFERENCE";

  public static readonly FIND_APPLICATION_PREFERENCE: string =
    "FIND_APPLICATION_PREFERENCE";

  public static readonly APPLICATION_PREFERENCE_SYSTEM_NAME_INPUT_HELP: string =
    "APPLICATION_PREFERENCE_SYSTEM_NAME_INPUT_HELP";

  public static readonly DELETE_APPLICATION_REFERENCE: string =
    "DELETE_APPLICATION_REFERENCE";

  public static readonly DELETING_APPLICATION_PREFERENCE_WILL_REMOVE_FROM_DB: string =
    "DELETING_APPLICATION_PREFERENCE_WILL_REMOVE_FROM_DB";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_APPLICATION_PREFERENCE: string =
    "DO_YOU_WANT_TO_DELETE_THE_APPLICATION_PREFERENCE";

  public static readonly INSERT_APPLICATION_PREFERENCE: string =
    "INSERT_APPLICATION_PREFERENCE";

  public static readonly WORKFLOW: string = "WORKFLOW";

  public static readonly ASSIGNEE: string = "ASSIGNEE";

  public static readonly OLD_ASSIGNEE: string = "OLD_ASSIGNEE";

  public static readonly NEW_ASSIGNEE: string = "NEW_ASSIGNEE";

  public static readonly SELECT_NEW_ASSIGNEE: string = "SELECT_NEW_ASSIGNEE";

  public static readonly WORKFLOW_STEP: string = "WORKFLOW_STEP";

  public static readonly INSTRUCTION_LINE: string = "INSTRUCTION_LINE";

  public static readonly PLACE_AFTER: string = "PLACE_AFTER";

  public static readonly NEW_WORKFLOW_STEP: string = "NEW_WORKFLOW_STEP";

  public static readonly NEW_WORKFLOW_SIDE_STEP: string =
    "NEW_WORKFLOW_SIDE_STEP";

  public static readonly LET_USERS_SEE_WORKFLOW_STEPS_AND_STEP_CURRENTLY_AT: string =
    "LET_USERS_SEE_WORKFLOW_STEPS_AND_STEP_CURRENTLY_AT";

  public static readonly NO_ROLE_SELECTED: string = "NO_ROLE_SELECTED";

  public static readonly NO_TRANSITION_SELECTED: string =
    "NO_TRANSITION_SELECTED";

  public static readonly SELECT_STEP_TO_PLACE_AFTER: string =
    "SELECT_STEP_TO_PLACE_AFTER";

  public static readonly CHOOSE_STEP: string = "CHOOSE_STEP";

  public static readonly SELECT_ASSIGNEE_TO_THE_STEP: string =
    "SELECT_ASSIGNEE_TO_THE_STEP";

  public static readonly DISPLAY_STEP_IN_WORKFLOW_GRAPH: string =
    "DISPLAY_STEP_IN_WORKFLOW_GRAPH";

  public static readonly EDIT_INSTRUCTION_LINE_HEADER: string =
    "EDIT_INSTRUCTION_LINE_HEADER";

  public static readonly EXAMPLE_INSTRUCTION_LINE: string =
    "EXAMPLE_INSTRUCTION_LINE";

  public static readonly SELECT_ENTITY: string = "SELECT_ENTITY";

  public static readonly SWITCH_ASSIGNEE: string = "SWITCH_ASSIGNEE";

  public static readonly REMOVE_ASSIGNEE: string = "REMOVE_ASSIGNEE";

  public static readonly SWITCH_ASSIGNEE_HEADER: string =
    "SWITCH_ASSIGNEE_HEADER";

  public static readonly A_FORM_WITH_ENTERED_NAME_ALREADY_EXISTS: string =
    "A_FORM_WITH_ENTERED_NAME_ALREADY_EXISTS";

  public static readonly ENTER_A_UNIQUE_FORM_NAME: string =
    "ENTER_A_UNIQUE_FORM_NAME";

  public static readonly CREATE_NEW_BLANK_FORM: string =
    "CREATE_NEW_BLANK_FORM";

  public static readonly START: string = "START";

  public static readonly SELECTED_ELEMENT: string = "SELECTED_ELEMENT";

  public static readonly STEP: string = "STEP";

  public static readonly FLOW_STEP_PANEL_TITLE: string =
    "FLOW_STEP_PANEL_TITLE";

  public static readonly SIDE_STEP_PANEL_TITLE: string =
    "SIDE_STEP_PANEL_TITLE";

  public static readonly DELETE_STEP_DESCRIPTION: string =
    "DELETE_STEP_DESCRIPTION";

  public static readonly DELETE_ROLE_DESCRIPTION: string =
    "DELETE_ROLE_DESCRIPTION";

  public static readonly RESUME_MAIN_FLOW_INDICATOR_TOOLTIP: string =
    "RESUME_MAIN_FLOW_INDICATOR_TOOLTIP";

  public static readonly AUTHORIZATION_TREES: string = "AUTHORIZATION_TREES";

  public static readonly ROLES: string = "ROLES";

  public static readonly AUTHORIZATION_PANE_DEFAULT_TEXT: string =
    "AUTHORIZATION_PANE_DEFAULT_TEXT";

  public static readonly THIS_AUTH_TREE_IS_BASED_ON: string =
    "THIS_AUTH_TREE_IS_BASED_ON";

  public static readonly AUTHORIZATION_TREE: string = "AUTHORIZATION_TREE";

  public static readonly IN_TREE: string = "IN_TREE";

  public static readonly EXPAND_ALL: string = "EXPAND_ALL";

  public static readonly COLLAPSE: string = "COLLAPSE";

  public static readonly DIALOG_ROLES_TOOLTIP: string = "DIALOG_ROLES_TOOLTIP";

  public static readonly CREATE_NEW_ROLE: string = "CREATE_NEW_ROLE";

  public static readonly DELETE_ROLE: string = "DELETE_ROLE";

  public static readonly DELETE_PRODUCT: string = "DELETE_PRODUCT";

  public static readonly YOU_SHOUD_REMOVE_AUTHORIZATION_NODES_BEFORE_DELETING: string =
    "YOU_SHOUD_REMOVE_AUTHORIZATION_NODES_BEFORE_DELETING";

  public static readonly YOU_SHOUD_REMOVE_DIALOG_ROLES_BEFORE_DELETING: string =
    "YOU_SHOUD_REMOVE_DIALOG_ROLES_BEFORE_DELETING";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_ROLE: string =
    "DO_YOU_WANT_TO_DELETE_THE_ROLE";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_PRODUCT: string =
    "DO_YOU_WANT_TO_DELETE_THE_PRODUCT";

  public static readonly BASE_ROLE: string = "BASE_ROLE";

  public static readonly DEFAULT_SCOREBOARD: string = "DEFAULT_SCOREBOARD";

  public static readonly DEFAULT_SKIN: string = "DEFAULT_SKIN";

  public static readonly ROLE: string = "ROLE";

  public static readonly FIND: string = "FIND";

  public static readonly COMMON: string = "COMMON";

  public static readonly USER_SET_IN_PROPERTY: string = "USER_SET_IN_PROPERTY";

  public static readonly USERS_ASSIGNED_TO_ROLE: string =
    "USERS_ASSIGNED_TO_ROLE";

  public static readonly USER_SET_IN_APP_PREF: string = "USER_SET_IN_APP_PREF";

  public static readonly TABLE_LEVEL_AUTH: string = "TABLE_LEVEL_AUTH";

  public static readonly ROW_LEVEL_AUTH: string = "ROW_LEVEL_AUTH";

  public static readonly FOLDER: string = "FOLDER";

  public static readonly CUSTOM: string = "CUSTOM";

  public static readonly NEW_AUTH_NODE: string = "NEW_AUTH_NODE";

  public static readonly AUTH_NODE: string = "AUTH_NODE";

  public static readonly USER_SET_IN_PROPERTY_TIP: string =
    "USER_SET_IN_PROPERTY_TIP";

  public static readonly USERS_ASSIGNED_TO_ROLE_TIP: string =
    "USERS_ASSIGNED_TO_ROLE_TIP";

  public static readonly USER_SET_IN_APP_PREF_TIP: string =
    "USER_SET_IN_APP_PREF_TIP";

  public static readonly TABLE_LEVEL_AUTH_TIP: string = "TABLE_LEVEL_AUTH_TIP";

  public static readonly ROW_LEVEL_AUTH_TIP: string = "ROW_LEVEL_AUTH_TIP";

  public static readonly FOLDER_TIP: string = "FOLDER_TIP";

  public static readonly NEXT_BUTTON: string = "NEXT_BUTTON";

  public static readonly BACK_BUTTON: string = "BACK_BUTTON";

  public static readonly FINISH: string = "FINISH";

  public static readonly SENIOR_NODE: string = "SENIOR_NODE";

  public static readonly USER_SET_IN_PROPERTY_TITLE: string =
    "USER_SET_IN_PROPERTY_TITLE";

  public static readonly USER_ASSIGNED_TO_ROLE_TITLE: string =
    "USER_ASSIGNED_TO_ROLE_TITLE";

  public static readonly USER_SET_IN_APP_PREF_TITLE: string =
    "USER_SET_IN_APP_PREF_TITLE";

  public static readonly SENIOR_NODE_TIP: string = "SENIOR_NODE_TIP";

  public static readonly APPLICATION_PREFERENCE: string =
    "APPLICATION_PREFERENCE";

  public static readonly TABLE_LEVEL_AUTH_TOPIC: string =
    "TABLE_LEVEL_AUTH_TOPIC";

  public static readonly ROW_LEVEL_AUTH_TOPIC: string = "ROW_LEVEL_AUTH_TOPIC";

  public static readonly FOLDER_NAME: string = "FOLDER_NAME";

  public static readonly FOLDER_TITLE: string = "FOLDER_TITLE";

  public static readonly NODE_NAME: string = "NODE_NAME";

  public static readonly CUSTOM_NODE: string = "CUSTOM_NODE";

  public static readonly CRITERIA: string = "CRITERIA";

  public static readonly PRE_WHERE: string = "PRE_WHERE";

  public static readonly WHERE_CLAUSE: string = "WHERE_CLAUSE";

  public static readonly DELETE_AUTH_NODE_TITLE: string =
    "DELETE_AUTH_NODE_TITLE";

  public static readonly DELETE_AUTH_NODE_SUB_TITLE: string =
    "DELETE_AUTH_NODE_SUB_TITLE";

  public static readonly DELETE_AUTH_NODE_TEXT: string =
    "DELETE_AUTH_NODE_TEXT";

  public static readonly MAKE_SURE_NO_WORKFLOW_STEPS_ARE_USING_THE_STATUS: string =
    "MAKE_SURE_NO_WORKFLOW_STEPS_ARE_USING_THE_STATUS";

  public static readonly DELETE_STATUS: string = "DELETE_STATUS";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_STATUS: string =
    "DO_YOU_WANT_TO_DELETE_THE_STATUS";

  public static readonly CREATE_NEW_STATUS: string = "CREATE_NEW_STATUS";

  public static readonly THE_STATE_OF_THE_ENTITY_IN_THIS_STATUS: string =
    "THE_STATE_OF_THE_ENTITY_IN_THIS_STATUS";

  public static readonly STATE: string = "STATE";

  public static readonly ACTIVE: string = "ACTIVE";

  public static readonly INACTIVE: string = "INACTIVE";

  public static readonly DELETED: string = "DELETED";

  public static readonly STATUS_LIST: string = "STATUS_LIST";

  public static readonly DELETE_AUTH_TREE_WARNING: string =
    "DELETE_AUTH_TREE_WARNING";

  public static readonly ARE_YOU_SURE_YOU_WANT_TO_REMOVE_OBJECT_WARNING: string =
    "ARE_YOU_SURE_YOU_WANT_TO_REMOVE_OBJECT_WARNING";

  public static readonly ALWAYS_MANDATORY: string = "ALWAYS_MANDATORY";

  public static readonly MANDATORY_AT_WORKFLOW_TRANSITIONS: string =
    "MANDATORY_AT_WORKFLOW_TRANSITIONS";

  public static readonly NOT_MANDATORY: string = "NOT_MANDATORY";

  public static readonly MANDATORY_AT_WORKFLOW_TRANSITIONS_HELP: string =
    "MANDATORY_AT_WORKFLOW_TRANSITIONS_HELP";

  public static readonly TRANSITION: string = "TRANSITION";

  public static readonly TRANSITION_PICKER: string = "TRANSITION_PICKER";

  public static readonly TRANSITION_FROM: string = "TRANSITION_FROM";

  public static readonly TRANSITION_SETTINGS: string = "TRANSITION_SETTINGS";

  public static readonly TRANSITION_SETTINGS_ROLE_GROUP_DESCRIPTION: string =
    "TRANSITION_SETTINGS_ROLE_GROUP_DESCRIPTION";

  public static readonly DELETE_TRANSITION_DESCRIPTION: string =
    "DELETE_TRANSITION_DESCRIPTION";

  public static readonly ALLOWED_USERS: string = "ALLOWED_USERS";

  public static readonly SELECT_ROLE_TO_AUTHORIZE: string =
    "SELECT_ROLE_TO_AUTHORIZE";

  public static readonly SENIOR_ROLES_ARE_AUTHORIZED: string =
    "SENIOR_ROLES_ARE_AUTHORIZED";

  public static readonly SELECT_AT_LEAST_ONE_NODE: string =
    "SELECT_AT_LEAST_ONE_NODE";

  public static readonly ADD_SIDE_STEP_DESCRIPTION: string =
    "ADD_SIDE_STEP_DESCRIPTION";

  public static readonly ADD_FLOW_STEP_DESCRIPTION: string =
    "ADD_FLOW_STEP_DESCRIPTION";

  public static readonly HOW_WORKFLOW_RESUME_STEP: string =
    "HOW_WORKFLOW_RESUME_STEP";

  public static readonly DISPLAY_IN_RESUME_MAIN_FLOW: string =
    "DISPLAY_IN_RESUME_MAIN_FLOW";

  public static readonly MANUALLY_ADD_TRANSITIONS_OTHER_STEPS: string =
    "MANUALLY_ADD_TRANSITIONS_OTHER_STEPS";

  public static readonly FROM_CAMEL_CASE: string = "FROM_CAMEL_CASE";

  public static readonly TO_CAMEL_CASE: string = "TO_CAMEL_CASE";

  public static readonly SELECT: string = "SELECT";

  public static readonly WORKFLOW_BUTTONS: string = "WORKFLOW_BUTTONS";

  public static readonly NEW_GROUP: string = "NEW_GROUP";

  public static readonly NEW_BUTTON: string = "NEW_BUTTON";

  public static readonly SET_GROUPING_ORDER_WORKFLOW_BUTTONS_USING_LIST: string =
    "SET_GROUPING_ORDER_WORKFLOW_BUTTONS_USING_LIST";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_GROUP: string =
    "DO_YOU_WANT_TO_DELETE_THE_GROUP";

  public static readonly BUTTONS_CURRENTLY_IN_GROUP_WILL_MOVE_TO_FIRST_GROUP: string =
    "BUTTONS_CURRENTLY_IN_GROUP_WILL_MOVE_TO_FIRST_GROUP";

  public static readonly DELETE_BUTTON: string = "DELETE_BUTTON";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_BUTTON: string =
    "DO_YOU_WANT_TO_DELETE_THE_BUTTON";

  public static readonly ALL_TRANSITIONS_USING_THIS_BUTTON_WILL_BE_DELETED: string =
    "ALL_TRANSITIONS_USING_THIS_BUTTON_WILL_BE_DELETED";

  public static readonly DELETE_RIBBON_GROUP: string = "DELETE_RIBBON_GROUP";

  public static readonly ENTER_THE_DISPLAY_NAME_OF_GROUP: string =
    "ENTER_THE_DISPLAY_NAME_OF_GROUP";

  public static readonly EDIT_THE_DISPLAY_NAME_OF_GROUP: string =
    "EDIT_THE_DISPLAY_NAME_OF_GROUP";

  public static readonly EDIT_RIBBON_GROUP: string = "EDIT_RIBBON_GROUP";

  public static readonly CREATE_RIBBON_GROUP: string = "CREATE_RIBBON_GROUP";

  public static readonly SET_THE_GROUPING_OF_WORKFLOW_BUTTONS_USING_THE_LIST_BELOW: string =
    "SET_THE_GROUPING_OF_WORKFLOW_BUTTONS_USING_THE_LIST_BELOW";

  public static readonly REORDER_GROUPS_AND_BUTTONS_BY_DRAGGING: string =
    "REORDER_GROUPS_AND_BUTTONS_BY_DRAGGING";

  public static readonly PRINT: string = "PRINT";

  public static readonly FOLLOW_THIS: string = "FOLLOW_THIS";

  public static readonly UNFOLLOW_THIS: string = "UNFOLLOW_THIS";

  public static readonly APPROVERS: string = "APPROVERS";

  public static readonly SPECIFIC_USERS: string = "SPECIFIC_USERS";

  public static readonly WORKFLOW_CONDITION: string = "WORKFLOW_CONDITION";

  public static readonly NONE: string = "NONE";

  public static readonly OPEN_SETTINGS: string = "OPEN_SETTINGS";

  public static readonly BUTTON: string = "BUTTON";

  public static readonly ADD_TRANSITION: string = "ADD_TRANSITION";

  public static readonly ADD_TRANSITION_HELP: string = "ADD_TRANSITION_HELP";

  public static readonly CONFIRMATION: string = "CONFIRMATION";

  public static readonly ICON: string = "ICON";

  public static readonly AFTER_USER_CLICKS_BUTTON_CONFIRMATION_MESSAGE_DISPLAYED: string =
    "AFTER_USER_CLICKS_BUTTON_CONFIRMATION_MESSAGE_DISPLAYED";

  public static readonly ASK_THE_USER_ARE_YOU_SURE: string =
    "ASK_THE_USER_ARE_YOU_SURE";

  public static readonly ALLOW_USER_TO_ADD_COMMENTS: string =
    "ALLOW_USER_TO_ADD_COMMENTS";

  public static readonly MANDATE_USER_TO_ADD_COMMENTS: string =
    "MANDATE_USER_TO_ADD_COMMENTS";

  public static readonly DONT_DISPLAY_CONFIRMATION_MESSAGE: string =
    "DONT_DISPLAY_CONFIRMATION_MESSAGE";

  public static readonly USE_FOLLOWING_MESSAGE_INSTTEAD_THE_DEFAULT: string =
    "USE_FOLLOWING_MESSAGE_INSTTEAD_THE_DEFAULT";

  public static readonly HALF_SIZE: string = "HALF_SIZE";

  public static readonly FULL_SIZE: string = "FULL_SIZE";

  public static readonly RESTRICT_VIEWING_BUTTON: string =
    "RESTRICT_VIEWING_BUTTON";

  public static readonly CHECK_THAT_ALL_MANDATORY_CONTROLS_HAVE_VALUE_BEFORE_MOVING_WORKFLOW: string =
    "CHECK_THAT_ALL_MANDATORY_CONTROLS_HAVE_VALUE_BEFORE_MOVING_WORKFLOW";

  public static readonly TO_RESTRICT_VIEWING_THIS_BUTTON_SELECT_TRANSITION_AND_CLICK_ALLOWED_USER: string =
    "TO_RESTRICT_VIEWING_THIS_BUTTON_SELECT_TRANSITION_AND_CLICK_ALLOWED_USER";

  public static readonly SIZE: string = "SIZE";

  public static readonly CANNOT_DELETE_AUTOMATIC_GROUPS: string =
    "CANNOT_DELETE_AUTOMATIC_GROUPS";

  public static readonly CANNOT_DELETE_APPROVE_BUTTONS: string =
    "CANNOT_DELETE_APPROVE_BUTTONS";

  public static readonly CANNOT_DELETE_THE_CREATE_BUTTON: string =
    "CANNOT_DELETE_THE_CREATE_BUTTON";

  public static readonly CANNOT_DELETE_THE_SAVE_BUTTON: string =
    "CANNOT_DELETE_THE_SAVE_BUTTON";

  public static readonly APPROVAL: string = "APPROVAL";

  public static readonly REJECTION: string = "REJECTION";

  public static readonly GENERAL: string = "GENERAL";

  public static readonly RESUME: string = "RESUME";

  public static readonly MOVE_TO: string = "MOVE_TO";

  public static readonly RETURN_TO: string = "RETURN_TO";

  public static readonly SKIP_TO: string = "SKIP_TO";

  public static readonly APPROVE: string = "APPROVE";

  public static readonly RESUME_MAIN_FLOW: string = "RESUME_MAIN_FLOW";

  public static readonly NAME: string = "NAME";

  public static readonly FROM: string = "FROM";

  public static readonly MANY: string = "MANY";

  public static readonly RESET: string = "RESET";

  public static readonly BUTTONS: string = "BUTTONS";

  public static readonly CREATE_APPROVE: string = "CREATE_APPROVE";

  public static readonly ALL: string = "ALL";

  public static readonly CHOOSE_TWO_DIFFERENT_STEPS: string =
    "CHOOSE_TWO_DIFFERENT_STEPS";

  public static readonly APPROVED_BY: string = "APPROVED_BY";

  public static readonly ACTION_RULES: string = "ACTION_RULES";

  public static readonly STOP_RULES: string = "STOP_RULES";

  public static readonly SAVE_BUTTON: string = "SAVE_BUTTON";

  public static readonly ADDITIONAL_USERS: string = "ADDITIONAL_USERS";

  public static readonly SAVE_BUTTON_IS_DISPLAYED_TO: string =
    "SAVE_BUTTON_IS_DISPLAYED_TO";

  public static readonly USERS_ALLOWED_TO_APPROVE_THIS_STEP: string =
    "USERS_ALLOWED_TO_APPROVE_THIS_STEP";

  public static readonly EVERYONE_CAN_MOVE_WORKFLOW_BECAUSE_EVERYONE_ROLE_GROUP: string =
    "EVERYONE_CAN_MOVE_WORKFLOW_BECAUSE_EVERYONE_ROLE_GROUP";

  public static readonly SAVE_BUTTON_IS_VISIBLE_TO_EVERYONE_BECAUSE_EVERYONE_ROLE_GROUP: string =
    "SAVE_BUTTON_IS_VISIBLE_TO_EVERYONE_BECAUSE_EVERYONE_ROLE_GROUP";

  public static readonly BUTTON_VIEWABLE_BECAUSE_EVERYONE: string =
    "BUTTON_VIEWABLE_BECAUSE_EVERYONE";

  public static readonly BUTTON_CANT_BE_VIEWED: string =
    "BUTTON_CANT_BE_VIEWED";

  public static readonly FOLLOWING_USERS_ALLOWED_TO_STAR_THE_WORKFLOW: string =
    "FOLLOWING_USERS_ALLOWED_TO_STAR_THE_WORKFLOW";

  public static readonly PROGRESS_TO_THIS_STEP_ONLY_IF_CONDITIONS_SATISFIED: string =
    "PROGRESS_TO_THIS_STEP_ONLY_IF_CONDITIONS_SATISFIED";

  public static readonly STARTED_BY: string = "STARTED_BY";

  public static readonly DISPLAY_RESUME_BUTTON: string =
    "DISPLAY_RESUME_BUTTON";

  public static readonly THE_BUTTON_RETURNS_THE_FLOW_TO_LAST_STEP: string =
    "THE_BUTTON_RETURNS_THE_FLOW_TO_LAST_STEP";

  public static readonly USERS_ALLOWED_TO_MOVE_WORKFLOW_TO_AND_FROM: string =
    "USERS_ALLOWED_TO_MOVE_WORKFLOW_TO_AND_FROM";

  public static readonly WORKFLOW_SETTINGS: string = "WORKFLOW_SETTINGS";

  public static readonly DELETE_WORKFLOW: string = "DELETE_WORKFLOW";

  public static readonly UPDATE_ENTITY_STATUS_WHEN_ENTERING_STEP: string =
    "UPDATE_ENTITY_STATUS_WHEN_ENTERING_STEP";

  public static readonly ENTER_A_UNIQUE_WORKFLOW_NAME: string =
    "ENTER_A_UNIQUE_WORKFLOW_NAME";

  public static readonly A_WORKFLOW_WITH_ENTERED_NAME_ALREADY_EXISTS: string =
    "A_WORKFLOW_WITH_ENTERED_NAME_ALREADY_EXISTS";

  public static readonly SELECT_ICON: string = "SELECT_ICON";

  public static readonly SELECT_ICON_FOR_THE_BUTTON: string =
    "SELECT_ICON_FOR_THE_BUTTON";

  public static readonly CHOOSE_STATUS: string = "CHOOSE_STATUS";

  public static readonly CHOOSE_ASSIGNEE: string = "CHOOSE_ASSIGNEE";

  public static readonly CHOOSE_PLACE_AFTER: string = "CHOOSE_PLACE_AFTER";

  public static readonly NEW: string = "NEW";

  public static readonly WORKFLOW_FILTER: string = "WORKFLOW_FILTER";

  public static readonly USAGES: string = "USAGES";

  public static readonly CREATE_NEW_ITEM_DIALOG_BOX: string =
    "CREATE_NEW_ITEM_DIALOG_BOX";

  public static readonly ADDING_ROWS_TO_TABLE: string = "ADDING_ROWS_TO_TABLE";

  public static readonly ADMINISTRATION_PAGES: string = "ADMINISTRATION_PAGES";

  public static readonly USERS_CAN_CHANGE_ITEM_STATUS_USING_WORKFLOW: string =
    "USERS_CAN_CHANGE_ITEM_STATUS_USING_WORKFLOW";

  public static readonly USERS_CAN_ATTACH_FILES_TO_ITEM_CANNOT_BE_UNSELECTED: string =
    "USERS_CAN_ATTACH_FILES_TO_ITEM_CANNOT_BE_UNSELECTED";

  public static readonly USERS_CAN_CHANGE_ITEMS_ORDER_INSIDE_TABLES: string =
    "USERS_CAN_CHANGE_ITEMS_ORDER_INSIDE_TABLES";

  public static readonly ENTITY_WILL_APPEAR_IN_RECENT_VISITED_ITEMS: string =
    "ENTITY_WILL_APPEAR_IN_RECENT_VISITED_ITEMS";

  public static readonly ITEMS_ARE_ARRANGED_IN_A_TREE: string =
    "ITEMS_ARE_ARRANGED_IN_A_TREE";

  public static readonly USERS_CAN_CREATE_ITEMS_BY: string =
    "USERS_CAN_CREATE_ITEMS_BY";

  public static readonly MODIFIED_LABEL: string = "MODIFIED_LABEL";

  public static readonly MODIFIED_BY: string = "MODIFIED_BY";

  public static readonly CREATED_LABEL: string = "CREATED_LABEL";

  public static readonly CREATED_BY: string = "CREATED_BY";

  public static readonly REPORTS: string = "REPORTS";

  public static readonly USER_CAN_CREATE_REPORTS: string =
    "USER_CAN_CREATE_REPORTS";

  public static readonly SET_ENTITIES_ORDER: string = "SET_ENTITIES_ORDER";

  public static readonly USERS_CAN_FILTER_ITEMS_USING: string =
    "USERS_CAN_FILTER_ITEMS_USING";

  public static readonly AUTO_COMPLETE_TEXT_BOX: string =
    "AUTO_COMPLETE_TEXT_BOX";

  public static readonly LIST: string = "LIST";

  public static readonly USERS_CAN_CREATE_REPORT_BASED_ON_LOOKUP: string =
    "USERS_CAN_CREATE_REPORT_BASED_ON_LOOKUP";

  public static readonly PROPERTY_REPORTS_HEADER: string =
    "PROPERTY_REPORTS_HEADER";

  public static readonly LANGUAGES: string = "LANGUAGES";

  public static readonly REPORT_ENTITIES_ORDER: string =
    "REPORT_ENTITIES_ORDER";

  public static readonly REPORT_ENTITIES_ORDER_SUB_HEADER: string =
    "REPORT_ENTITIES_ORDER_SUB_HEADER";

  public static readonly WILL_BE_APPENDED_TO_WORKFLOW: string =
    "WILL_BE_APPENDED_TO_WORKFLOW";

  public static readonly WILL_BE_ADDED_AS_CHILD_TO_WORKFLOW: string =
    "WILL_BE_ADDED_AS_CHILD_TO_WORKFLOW";

  public static readonly WEB_SITE: string = "WEB_SITE";

  public static readonly NOTIFICATIONS: string = "NOTIFICATIONS";

  public static readonly SEND_EMAIL_NOTIFICATION_WHEN: string =
    "SEND_EMAIL_NOTIFICATION_WHEN";

  public static readonly ITEM_WAS_CREATED: string = "ITEM_WAS_CREATED";

  public static readonly ITEM_WAS_MODIFIED: string = "ITEM_WAS_MODIFIED";

  public static readonly ITEM_WAS_DELETED: string = "ITEM_WAS_DELETED";

  public static readonly YOU_CAN_ALSO_SET_WORKFLOW_NOTIFICATION_FROM_WE: string =
    "YOU_CAN_ALSO_SET_WORKFLOW_NOTIFICATION_FROM_WE";

  public static readonly RECIPIENTS: string = "RECIPIENTS";

  public static readonly SEPARATE_USERS_OR_EMAIL_USING_SEMI_COLONS: string =
    "SEPARATE_USERS_OR_EMAIL_USING_SEMI_COLONS";

  public static readonly TO: string = "TO";

  public static readonly CC: string = "CC";

  public static readonly BCC: string = "BCC";

  public static readonly SEND_EMAIL_NOTIFICATION_TO_THE_FOLLOWING_USERS: string =
    "SEND_EMAIL_NOTIFICATION_TO_THE_FOLLOWING_USERS";

  public static readonly SEND_EMAIL_NOTIFICATION_WHEN_PROPERTY_VALUE_CHANGED: string =
    "SEND_EMAIL_NOTIFICATION_WHEN_PROPERTY_VALUE_CHANGED";

  public static readonly NOTIFICATION: string = "NOTIFICATION";

  public static readonly TO_ASSIGNEE: string = "TO_ASSIGNEE";

  public static readonly TO_ADDITIONAL_USERS: string = "TO_ADDITIONAL_USERS";

  public static readonly SEND_NOTIFICATION_WHEN_WORKFLOW_HAS_MOVED_TO_THIS_STEP: string =
    "SEND_NOTIFICATION_WHEN_WORKFLOW_HAS_MOVED_TO_THIS_STEP";

  public static readonly PERSISTENCEBASEDTO_NAME_DISPLAY_NAME: string =
    "PERSISTENCEBASEDTO_NAME_DISPLAY_NAME";

  public static readonly NAME_FORMAT: string = "NAME_FORMAT";

  public static readonly PRIMARY_PROPERTIES_FOR_BROWSING_REPORTS_NOTIFICATIONS: string =
    "PRIMARY_PROPERTIES_FOR_BROWSING_REPORTS_NOTIFICATIONS";

  public static readonly PRIMARY_NAME_PROPERTY: string =
    "PRIMARY_NAME_PROPERTY";

  public static readonly UNIQUE_NAME_PROPERTY: string = "UNIQUE_NAME_PROPERTY";

  public static readonly SINGLE_LINE_PROPERTY: string = "SINGLE_LINE_PROPERTY";

  public static readonly NEW_ACTION: string = "NEW_ACTION";

  public static readonly NEW_ACTION_TOOLTIP: string = "NEW_ACTION_TOOLTIP";

  public static readonly SET_PROPERTY_VALUE: string = "SET_PROPERTY_VALUE";

  public static readonly XML_ACTION: string = "XML_ACTION";

  public static readonly XML_RULE: string = "XML_RULE";

  public static readonly ACTIONS: string = "ACTIONS";

  public static readonly CONDITIONALLY: string = "CONDITIONALLY";

  public static readonly PERFORM_ACTIONS_WHEN_ENTERING_STEP: string =
    "PERFORM_ACTIONS_WHEN_ENTERING_STEP";

  public static readonly PERFORM_ACTIONS_WHEN_EXITING_STEP: string =
    "PERFORM_ACTIONS_WHEN_EXITING_STEP";

  public static readonly TO_BE: string = "TO_BE";

  public static readonly SET: string = "SET";

  public static readonly PROPERTY_TO_SET_VALUE_TO: string =
    "PROPERTY_TO_SET_VALUE_TO";

  public static readonly VALUE_TO_SET: string = "VALUE_TO_SET";

  public static readonly ENABLE_CONDITION: string = "ENABLE_CONDITION";

  public static readonly CONDITIONS_TO_CHECK_BEFORE_RUNNING_THE_ACTION_OPTIONAL: string =
    "CONDITIONS_TO_CHECK_BEFORE_RUNNING_THE_ACTION_OPTIONAL";

  public static readonly ACTION_NAME: string = "ACTION_NAME";

  public static readonly ADD_CONDITION_XML_ELEMENTS_INSIDE_SERVERSTEP: string =
    "ADD_CONDITION_XML_ELEMENTS_INSIDE_SERVERSTEP";

  public static readonly ADD_JAVASCRIPT_XML_ELEMENTS_INSIDE_CUSTOM: string =
    "ADD_JAVASCRIPT_XML_ELEMENTS_INSIDE_CUSTOM";

  public static readonly ADD_CONDITION_XML_ELEMENTS: string =
    "ADD_CONDITION_XML_ELEMENTS";

  public static readonly SELECT_OPTION: string = "SELECT_OPTION";

  public static readonly ACTIONS_TO_PERFORM_AFTER_USER_CLICK: string =
    "ACTIONS_TO_PERFORM_AFTER_USER_CLICK";

  public static readonly ACTION_BUTTON: string = "ACTION_BUTTON";

  public static readonly CREATE_ACTION_BUTTON: string = "CREATE_ACTION_BUTTON";

  public static readonly FIRST_TAB_DEFAULT_NAME: string =
    "FIRST_TAB_DEFAULT_NAME";

  public static readonly HOME: string = "HOME";

  public static readonly DELETE_WORKFLOW_TEXT: string = "DELETE_WORKFLOW_TEXT";

  public static readonly ARE_YOU_SURE_DELETE_WORKFLOW: string =
    "ARE_YOU_SURE_DELETE_WORKFLOW";

  public static readonly DELETE_WORKFLOW_TITLE: string =
    "DELETE_WORKFLOW_TITLE";

  public static readonly DELETE_AUTH_TREE: string = "DELETE_AUTH_TREE";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_TREE: string =
    "DO_YOU_WANT_TO_DELETE_THE_TREE";

  public static readonly YOU_SHOUD_REMOVE_FORMS_BEFORE_DELETE: string =
    "YOU_SHOUD_REMOVE_FORMS_BEFORE_DELETE";

  public static readonly DO_YOU_WANT_TO_REMOVE_THE_ROLE: string =
    "DO_YOU_WANT_TO_REMOVE_THE_ROLE";

  public static readonly DO_YOU_WANT_TO_REMOVE_THE_STEP: string =
    "DO_YOU_WANT_TO_REMOVE_THE_STEP";

  public static readonly REMOVE_ROLE: string = "REMOVE_ROLE";

  public static readonly REMOVE_STEP: string = "REMOVE_STEP";

  public static readonly NEW_FORM: string = "NEW_FORM";

  public static readonly NEW_WORKFLOW: string = "NEW_WORKFLOW";

  public static readonly THIS_WORKFLOW_IS_BASED: string =
    "THIS_WORKFLOW_IS_BASED_ON";

  public static readonly THIS_FORM_IS_BASED_ON: string =
    "THIS_FORM_IS_BASED_ON";

  public static readonly INSERT_NEW_PROPERTY: string = "INSERT_NEW_PROPERTY";

  public static readonly INSERT_NEW_COLUMN_PROPERTY: string =
    "INSERT_NEW_COLUMN_PROPERTY";

  public static readonly TIME_CREATED: string = "TIME_CREATED";

  public static readonly TIME_UPDATED: string = "TIME_UPDATED";

  public static readonly UPDATED_BY: string = "UPDATED_BY";

  public static readonly SAVING_CHANGES: string = "SAVING_CHANGES";

  public static readonly SORRY: string = "SORRY";

  public static readonly SAVE_FAILED_MESSAGE: string = "SAVE_FAILED_MESSAGE";

  public static readonly PERSISTENCEBASEDTO_FOLLOWERS_DISPLAY_NAME: string =
    "PERSISTENCEBASEDTO_FOLLOWERS_DISPLAY_NAME";

  public static readonly FOLLOWERS_DISPLAY_NAME: string =
    "FOLLOWERS_DISPLAY_NAME";

  public static readonly USERS_CAN_ADD_ITEMS_TO_FOLLOW_LIST_CANNOT_BE_UNSELECTED: string =
    "USERS_CAN_ADD_ITEMS_TO_FOLLOW_LIST_CANNOT_BE_UNSELECTED";

  public static readonly USER_CAN_INTEGRATE_ENTITY_WITH_EXTERNAL: string =
    "USER_CAN_INTEGRATE_ENTITY_WITH_EXTERNAL";

  public static readonly FOLLOWED_ITEMS_CAN_BE_VIEWED_IN_SCOREBOARD: string =
    "FOLLOWED_ITEMS_CAN_BE_VIEWED_IN_SCOREBOARD";

  public static readonly REMOVE_THIS_ITEM_FROM_FOLLOWED: string =
    "REMOVE_THIS_ITEM_FROM_FOLLOWED";

  public static readonly CUSTOM_LINK_HELP_TEXT: string =
    "CUSTOM_LINK_HELP_TEXT";

  public static readonly NEW_ACTION_BUTTON: string = "NEW_ACTION_BUTTON";

  public static readonly RESET_ZOOM: string = "RESET_ZOOM";

  public static readonly FIT_TO_WINDOW_TOOLTIP: string =
    "FIT_TO_WINDOW_TOOLTIP";

  public static readonly MANAGE_BUTTONS: string = "MANAGE_BUTTONS";

  public static readonly IMPORT_EXPORT: string = "IMPORT_EXPORT";

  public static readonly LOG: string = "LOG";

  public static readonly EXPORT_LOCATION: string = "EXPORT_LOCATION";

  public static readonly IMPORT_LOCATION: string = "IMPORT_LOCATION";

  public static readonly IMPORT: string = "IMPORT";

  public static readonly STEP_ONE_IMPORT_DB_SCHEMA: string =
    "STEP_ONE_IMPORT_DB_SCHEMA";

  public static readonly STEP_TWO_IMPORT_SOLUTION_CONFIGURATION: string =
    "STEP_TWO_IMPORT_SOLUTION_CONFIGURATION";

  public static readonly EXPORT: string = "EXPORT";

  public static readonly STEP_ONE_DESCRIPTION: string = "STEP_ONE_DESCRIPTION";

  public static readonly STEP_TWO_DESCRIPTION: string = "STEP_TWO_DESCRIPTION";

  public static readonly STEP_THREE_DESCRIPTION: string =
    "STEP_THREE_DESCRIPTION";

  public static readonly ADMINISTRATION_PAGES_SETTINGS: string =
    "ADMINISTRATION_PAGES_SETTINGS";

  public static readonly ADMIN_CAN_MANAGE_ITEMS_BY: string =
    "ADMIN_CAN_MANAGE_ITEMS_BY";

  public static readonly TREE_ENTITY_AS_ROOT: string = "TREE_ENTITY_AS_ROOT";

  public static readonly TREE_ANOTHER_ENTITY_AS_ROOT: string =
    "TREE_ANOTHER_ENTITY_AS_ROOT";

  public static readonly CUSTOM_INPUT_URL: string = "CUSTOM_INPUT_URL";

  public static readonly CONFIGURATION_ITEMS_SECTION: string =
    "CONFIGURATION_ITEMS_SECTION";

  public static readonly THE_ENTITY_WILL_BE_DISPLAYED_CONFIGURATION_ITEMS: string =
    "THE_ENTITY_WILL_BE_DISPLAYED_CONFIGURATION_ITEMS";

  public static readonly DEFINE: string = "DEFINE";

  public static readonly HIERARCHICAL_ADMIN_PAGE_DEFINITION: string =
    "HIERARCHICAL_ADMIN_PAGE_DEFINITION";

  public static readonly RELATIONSHIP_PROPERTY: string =
    "RELATIONSHIP_PROPERTY";

  public static readonly NO_LOOKUP_PROPERTY_FOUND: string =
    "NO_LOOKUP_PROPERTY_FOUND";

  public static readonly NEW_HIERARCHY_LEVEL: string = "NEW_HIERARCHY_LEVEL";

  public static readonly EDIT_HIERARCHY_LEVEL: string = "EDIT_HIERARCHY_LEVEL";

  public static readonly NEW_HIERARCHY_LEVEL_TIP: string =
    "NEW_HIERARCHY_LEVEL_TIP";

  public static readonly DELETE_ITEM_SUB_TITLE: string =
    "DELETE_ITEM_SUB_TITLE";

  public static readonly DELETE_ITEM: string = "DELETE_ITEM";

  public static readonly DELETE_ITEM_TEXT: string = "DELETE_ITEM_TEXT";

  public static readonly SELECT_AT_LEAST_ONE_OPTION: string =
    "SELECT_AT_LEAST_ONE_OPTION";

  public static readonly VALIDATION_FAILED: string = "VALIDATION_FAILED";

  public static readonly SOME_SETTINGS_HAVE_INVALID_DATA: string =
    "SOME_SETTINGS_HAVE_INVALID_DATA";

  public static readonly AUTHENTICATION: string = "AUTHENTICATION";

  public static readonly INTEGRATIONS: string = "INTEGRATIONS";

  public static readonly LOGGING_TROUBLESHOOT: string = "LOGGING_TROUBLESHOOT";

  public static readonly OBSOLETE: string = "OBSOLETE";

  public static readonly SERVER_ADMIN: string = "SERVER_ADMIN";

  public static readonly CANNOT_DELETE_OBJECT_CAUSE_OTHER_USING_IT: string =
    "CANNOT_DELETE_OBJECT_CAUSE_OTHER_USING_IT";

  public static readonly CANNOT_DELETE_LANE_WITH_STEPS: string =
    "CANNOT_DELETE_LANE_WITH_STEPS";

  public static readonly TO_DELETE_THIS_LANE_FIRST_DELETE_STEPS: string =
    "TO_DELETE_THIS_LANE_FIRST_DELETE_STEPS";

  public static readonly MY_WORK: string = "MY_WORK";

  public static readonly NEW_POLICY: string = "NEW_POLICY";

  public static readonly CALENDARS: string = "CALENDARS";

  public static readonly SELECT_POLICY_FROM_TREE: string =
    "SELECT_POLICY_FROM_TREE";

  public static readonly CALENDAR: string = "CALENDAR";

  public static readonly ENTITIES_AND_TASK_GROUPS: string =
    "ENTITIES_AND_TASK_GROUPS";

  public static readonly REMOVE_ENTITY_SUB_TITLE: string =
    "REMOVE_ENTITY_SUB_TITLE";

  public static readonly REMOVE_ENTITY_TITLE: string = "REMOVE_ENTITY_TITLE";

  public static readonly REMOVE_ENTITY_TEXT: string = "REMOVE_ENTITY_TEXT";

  public static readonly DELETE_TASK_GROUP_SUB_TITLE: string =
    "DELETE_TASK_GROUP_SUB_TITLE";

  public static readonly DELETE_TASK_GROUP_TITLE: string =
    "DELETE_TASK_GROUP_TITLE";

  public static readonly ADD_ENTITY: string = "ADD_ENTITY";

  public static readonly ADD_ENTITY_TOOLTIP: string = "ADD_ENTITY_TOOLTIP";

  public static readonly NEW_TASK_GROUP: string = "NEW_TASK_GROUP";

  public static readonly NEW_TASK_STYLE: string = "NEW_TASK_STYLE";

  public static readonly NEW_TASK_GROUP_TOOLTIP: string =
    "NEW_TASK_GROUP_TOOLTIP";

  public static readonly NEW_TASK_STYLE_TOOLTIP: string =
    "NEW_TASK_STYLE_TOOLTIP";

  public static readonly MY_WORK_POLICY_INFO: string = "MY_WORK_POLICY_INFO";

  public static readonly VIEWING_WORKSHEET_OF_OTHER_USERS: string =
    "VIEWING_WORKSHEET_OF_OTHER_USERS";

  public static readonly USERS_CAN_VIEW_WORKSHEETS: string =
    "USERS_CAN_VIEW_WORKSHEETS";

  public static readonly USE_ROLE_GROUPS_TO_CHECK_DIFFERENT: string =
    "USE_ROLE_GROUPS_TO_CHECK_DIFFERENT";

  public static readonly VIEWING_WORKSHEET_FOR_EXAMPLE: string =
    "VIEWING_WORKSHEET_FOR_EXAMPLE";

  public static readonly VIEWING_WORKSHEET_FOR_EXAMPLE_SECOND: string =
    "VIEWING_WORKSHEET_FOR_EXAMPLE_SECOND";

  public static readonly ADD_ENTITY_TO_MY_WORK_POLICY: string =
    "ADD_ENTITY_TO_MY_WORK_POLICY";

  public static readonly DELETE_MY_WORK_POLICY: string =
    "DELETE_MY_WORK_POLICY";

  public static readonly DELETE_MY_WORK_POLICY_HEADER: string =
    "DELETE_MY_WORK_POLICY_HEADER";

  public static readonly DELETE_MY_WORK_POLICY_TEXT: string =
    "DELETE_MY_WORK_POLICY_TEXT";

  public static readonly DELETE_CALENDAR: string = "DELETE_CALENDAR";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_CALENDAR: string =
    "DO_YOU_WANT_TO_DELETE_THE_CALENDAR";

  public static readonly CREATE_NEW_MY_WORK_CALENDAR: string =
    "CREATE_NEW_MY_WORK_CALENDAR";

  public static readonly TASK_GROUP: string = "TASK_GROUP";

  public static readonly EXAMPLE_PORTFOLIO_REQUIREMENT_TASK: string =
    "EXAMPLE_PORTFOLIO_REQUIREMENT_TASK";

  public static readonly USE_THE_FOLLOWING_NAME_FORMAT_IN_MYWORK_INSTEAD_OF_THE_DEFAULT: string =
    "USE_THE_FOLLOWING_NAME_FORMAT_IN_MYWORK_INSTEAD_OF_THE_DEFAULT";

  public static readonly SET_TASK_GROUP_DISPLAY_NAME: string =
    "SET_TASK_GROUP_DISPLAY_NAME";

  public static readonly INFORMATION: string = "INFORMATION";

  public static readonly SPECIFY_WHO_CAN_TRACK_TIME_AGAINST_ITEMS: string =
    "SPECIFY_WHO_CAN_TRACK_TIME_AGAINST_ITEMS";

  public static readonly SPECIFY_WITH_USERS_ABLE_TO_VIEW_TASK_GROUP: string =
    "SPECIFY_WITH_USERS_ABLE_TO_VIEW_TASK_GROUP";

  public static readonly NO_ITEMS_BE_INCLUDED_IN_GROUP: string =
    "NO_ITEMS_BE_INCLUDED_IN_GROUP";

  public static readonly NO_ITEMS_BE_AVAILABLE_FOR_TRACKING_ADD_EVERYONE: string =
    "NO_ITEMS_BE_AVAILABLE_FOR_TRACKING_ADD_EVERYONE";

  public static readonly ALL_ITEMS_ARE_AVAILABLE_BECAUSE_EVERYONE: string =
    "ALL_ITEMS_ARE_AVAILABLE_BECAUSE_EVERYONE";

  public static readonly ALL_ITEMS_BE_INCLUDED_IN_GROUP_BECAUSE_EVERYONE: string =
    "ALL_ITEMS_BE_INCLUDED_IN_GROUP_BECAUSE_EVERYONE";

  public static readonly THE_GROUP_NOT_DISPLAYED_ADD_EVERYONE: string =
    "THE_GROUP_NOT_DISPLAYED_ADD_EVERYONE";

  public static readonly THE_GROUP_ALWAYS_DISPLAYED_BECAUSE_EVERYONE: string =
    "THE_GROUP_ALWAYS_DISPLAYED_BECAUSE_EVERYONE";

  public static readonly THIS_ENTITY_WILL_BE_AVAILABLE_TO_ALL_BECAUSE_EVERYONE: string =
    "THIS_ENTITY_WILL_BE_AVAILABLE_TO_ALL_BECAUSE_EVERYONE";

  public static readonly AUTOMATIC_ADD_THIS_TASK_GROUP_TASKS_TO_WORKSHEET: string =
    "AUTOMATIC_ADD_THIS_TASK_GROUP_TASKS_TO_WORKSHEET";

  public static readonly NEW_CALENDAR: string = "NEW_CALENDAR";

  public static readonly WORK_DAYS: string = "WORK_DAYS";

  public static readonly SUNDAY: string = "SUNDAY";

  public static readonly MONDAY: string = "MONDAY";

  public static readonly TUESDAY: string = "TUESDAY";

  public static readonly WEDNESDAY: string = "WEDNESDAY";

  public static readonly THURSDAY: string = "THURSDAY";

  public static readonly FRIDAY: string = "FRIDAY";

  public static readonly SATURDAY: string = "SATURDAY";

  public static readonly SELECTED_WORK_DAYS: string = "SELECTED_WORK_DAYS";

  public static readonly EDIT_CALENDAR: string = "EDIT_CALENDAR";

  public static readonly DAY_EXCEPTIONS: string = "DAY_EXCEPTIONS";

  public static readonly NEW_DAY_EXCEPTION: string = "NEW_DAY_EXCEPTION";

  public static readonly DELETE_ENTITY: string = "DELETE_ENTITY";

  public static readonly DELETE_PROPERTY: string = "DELETE_PROPERTY";

  public static readonly CHOICE_OPTIONS: string = "CHOICE_OPTIONS";

  public static readonly NEW_CHOICE_OPTION: string = "NEW_CHOICE_OPTION";

  public static readonly EDIT_CHOICE_OPTION: string = "EDIT_CHOICE_OPTION";

  public static readonly TIME_AND_PROGRESS_TRACKING: string =
    "TIME_AND_PROGRESS_TRACKING";

  public static readonly INCLUDE_THIS_ENTITY_IN_MY_WORK_POLICIES: string =
    "INCLUDE_THIS_ENTITY_IN_MY_WORK_POLICIES";

  public static readonly IF_SELECTED_USERS_CAN_TRACK_TIME_AND_PROGRES_VIA_MY_WORK: string =
    "IF_SELECTED_USERS_CAN_TRACK_TIME_AND_PROGRES_VIA_MY_WORK";

  public static readonly PERSISTENCEBASEDTO_MYWORKTASK_DISPLAY_NAME: string =
    "PERSISTENCEBASEDTO_MYWORKTASK_DISPLAY_NAME";

  public static readonly PERSISTENCEBASEDTO_MYWORKTASK_DESCRIPTION: string =
    "PERSISTENCEBASEDTO_MYWORKTASK_DESCRIPTION";

  public static readonly MYWORKTASK_ENTITY_DISPLAY_NAME: string =
    "MYWORKTASK_ENTITY_DISPLAY_NAME";

  public static readonly FOLLOWERS_PROPERTY_DISPLAY_NAME: string =
    "FOLLOWERS_ENTITY_DISPLAY_NAME";

  public static readonly ATTACHMENTS_PROPERTY_DISPLAY_NAME: string =
    "ATTACHMENTS_PROPERTY_DISPLAY_NAME";

  public static readonly ENTITYCATEGORY_TITLE_PROPERTY_DISPLAY_NAME: string =
    "ENTITYCATEGORY_TITLE_PROPERTY_DISPLAY_NAME";

  public static readonly USER_ENTITY_DISPLAY_NAME: string =
    "USER_ENTITY_DISPLAY_NAME";

  public static readonly INSTANCELEVELINTEGRATIONOPERATION_ENTITY_DISPLAY_NAME: string =
    "INSTANCELEVELINTEGRATIONOPERATION_ENTITY_DISPLAY_NAME";

  public static readonly TRACKING: string = "TRACKING";

  public static readonly LINK_TO_ITEM: string = "LINK_TO_ITEM";

  public static readonly LINK_TO_ITEM_EXAMPLE: string = "LINK_TO_ITEM_EXAMPLE";

  public static readonly TASK_FORM: string = "TASK_FORM";

  public static readonly TASK_FORM_TIP: string = "TASK_FORM_TIP";

  public static readonly TASK_TIME_REPORT_FORM: string =
    "TASK_TIME_REPORT_FORM";

  public static readonly TASK_TIME_REPORT_FORM_TIP: string =
    "TASK_TIME_REPORT_FORM_TIP";

  public static readonly USERS_CAN_TRACK: string = "USERS_CAN_TRACK";

  public static readonly PROPERTY_HOLDING_PLANNED_WORK: string =
    "PROPERTY_HOLDING_PLANNED_WORK";

  public static readonly DEFAULT_VALUES: string = "DEFAULT_VALUES";

  public static readonly TASK: string = "TASK";

  public static readonly TASK_TIME_REPORT: string = "TASK_TIME_REPORT";

  public static readonly SET_INITIAL_VALUE_OF_TASK: string =
    "SET_INITIAL_VALUE_OF_TASK";

  public static readonly SET_INITIAL_VALUE_OF_TASK_TIME_REPORTS: string =
    "SET_INITIAL_VALUE_OF_TASK_TIME_REPORTS";

  public static readonly CHOOSE_PROPERTY_TO_SET_VALUE_TO: string =
    "CHOOSE_PROPERTY_TO_SET_VALUE_TO";

  public static readonly TASK_GROUPS: string = "TASK_GROUPS";

  public static readonly TASK_STYLES: string = "TASK_STYLES";

  public static readonly SET_TRACKING_PERMISSIONS: string =
    "SET_TRACKING_PERMISSIONS";

  public static readonly OPEN_WEEK_DAYS: string = "OPEN_WEEK_DAYS";

  public static readonly WORK_WEEK_DAYS: string = "WORK_WEEK_DAYS";

  public static readonly NON_WORK_WEEK_DAYS: string = "NON_WORK_WEEK_DAYS";

  public static readonly OPEN_NON_WORK_WEEK_DAYS: string =
    "OPEN_NON_WORK_WEEK_DAYS";

  public static readonly OPEN_DAY_EXCEPTIONS: string = "OPEN_DAY_EXCEPTIONS";

  public static readonly TASKS: string = "TASKS";

  public static readonly OPEN_TASK_LINES: string = "OPEN_TASK_LINES";

  public static readonly ATTENDANCE: string = "ATTENDANCE";

  public static readonly OPEN_ATTENDANCE_LINES: string =
    "OPEN_ATTENDANCE_LINES";

  public static readonly TRACKING_PERMISSIONS: string = "TRACKING_PERMISSIONS";

  public static readonly WORKSHEET_CONDITION: string = "WORKSHEET_CONDITION";

  public static readonly OPEN_WORKSHEET_BEFORE: string =
    "OPEN_WORKSHEET_BEFORE";

  public static readonly OPEN_WORKSHEET_AFTER: string = "OPEN_WORKSHEET_AFTER";

  public static readonly ADMIN_TIME: string = "ADMIN_TIME";

  public static readonly OPEN_ADMIN_TIME_LINES: string =
    "OPEN_ADMIN_TIME_LINES";

  public static readonly WORKSHEETS_AND_TASKS: string = "WORKSHEETS_AND_TASKS";

  public static readonly WORKSHEET_AUTH_TREE: string = "WORKSHEET_AUTH_TREE";

  public static readonly WORKSHEET_WORKFLOW: string = "WORKSHEET_WORKFLOW";

  public static readonly WORKSHEET_WORKFLOW_TIP: string =
    "WORKSHEET_WORKFLOW_TIP";

  public static readonly WORKSHEET_FORM: string = "WORKSHEET_FORM";

  public static readonly WORKSHEET_FORM_TIP: string = "WORKSHEET_FORM_TIP";

  public static readonly ADMIN_TIME_REPORT_FORM: string =
    "ADMIN_TIME_REPORT_FORM";

  public static readonly ADMIN_TIME_REPORT_TIP: string =
    "ADMIN_TIME_REPORT_TIP";

  public static readonly VALIDATIONS: string = "VALIDATIONS";

  public static readonly MAX_WORK_PER_DAY: string = "MAX_WORK_PER_DAY";

  public static readonly MIN_WORK_PER_DAY: string = "MIN_WORK_PER_DAY";

  public static readonly TOTAL_ACTUAL_WORK_ATTENDANCE: string =
    "TOTAL_ACTUAL_WORK_ATTENDANCE";

  public static readonly DAVIATION_RANGE: string = "DAVIATION_RANGE";

  public static readonly DEFAULT_VALUES_OF_ADMIN_TIME_REPORT: string =
    "DEFAULT_VALUES_OF_ADMIN_TIME_REPORT";

  public static readonly SET_INITIAL_VALUE_OF_ADMIN_TIME_REPORTS: string =
    "SET_INITIAL_VALUE_OF_ADMIN_TIME_REPORTS";

  public static readonly COLOR: string = "COLOR";

  public static readonly BACKGROUND_COLOR: string = "BACKGROUND_COLOR";

  public static readonly TASK_NAME_SAMPLE: string = "TASK_NAME_SAMPLE";

  public static readonly CHANGE_COLOR: string = "CHANGE_COLOR";

  public static readonly CONDITIONS: string = "CONDITIONS";

  public static readonly SPECIFY_WHEN_TASK_NAME_HIGHLIGHTED: string =
    "SPECIFY_WHEN_TASK_NAME_HIGHLIGHTED";

  public static readonly DELETE_TASK_STYLE_SUB_TITLE: string =
    "DELETE_TASK_STYLE_SUB_TITLE";

  public static readonly DELETE_TASK_STYLE_TITLE: string =
    "DELETE_TASK_STYLE_TITLE";

  public static readonly LOOKUP_ENTITY: string = "LOOKUP_ENTITY";

  public static readonly REVERSE_LOOKUP: string = "REVERSE_LOOKUP";

  public static readonly REVERSE_LOOKUP_PRIMARY_SUB_TEXT: string =
    "REVERSE_LOOKUP_PRIMARY_SUB_TEXT";

  public static readonly TABLE_SYSTEM_NAME: string = "TABLE_SYSTEM_NAME";

  public static readonly REVERSE_LOOKUP_SYSTEM_NAME: string =
    "REVERSE_LOOKUP_SYSTEM_NAME";

  public static readonly REVERSE_LOOKUP_DISPLAY_NAME: string =
    "REVERSE_LOOKUP_DISPLAY_NAME";

  public static readonly REVERSE_LOOKUP_DISPLAY_NAME_INPUT_HELP: string =
    "REVERSE_LOOKUP_DISPLAY_NAME_INPUT_HELP";

  public static readonly WORKSHEET_WEEK_START: string = "WORKSHEET_WEEK_START";

  public static readonly WORKSHEET_WEEK_END: string = "WORKSHEET_WEEK_END";

  public static readonly WORKSHEET: string = "WORKSHEET";

  public static readonly RESULTS_FILTER: string = "RESULTS_FILTER";

  public static readonly LOGGED_IN_USER_IS_ASSIGNED: string =
    "LOGGED_IN_USER_IS_ASSIGNED";

  public static readonly FILTER_REPORT_RESULTS: string =
    "FILTER_REPORT_RESULTS";

  public static readonly FILTER_REPORT_RESULTS_SUB_TEXT: string =
    "FILTER_REPORT_RESULTS_SUB_TEXT";

  public static readonly LOGGED_IN_USER_ROLE_FILTER: string =
    "LOGGED_IN_USER_ROLE_FILTER";

  public static readonly LOGGED_IN_USER_ROLE: string = "LOGGED_IN_USER_ROLE";

  public static readonly LOGGED_IN_USER_IS_ASSIGNED_TO_ROLE: string =
    "LOGGED_IN_USER_IS_ASSIGNED_TO_ROLE";

  public static readonly EXCLUDE_FORM_BUTTONS: string = "EXCLUDE_FORM_BUTTONS";

  public static readonly ACTION_RULE_WIZARD: string = "ACTION_RULE_WIZARD";

  public static readonly STOP_RULE_WIZARD: string = "STOP_RULE_WIZARD";

  public static readonly ATTACHMENT_STOP_RULE: string = "ATTACHMENT_STOP_RULE";

  public static readonly ATTACHMENT_STOP_RULE_MESSAGE: string =
    "ATTACHMENT_STOP_RULE_MESSAGE";

  public static readonly ATTACHMENT_STOP_RULE_DESCRIPTION: string =
    "ATTACHMENT_STOP_RULE_DESCRIPTION";

  public static readonly ACTION_RULE_DESCRIPTION: string =
    "ACTION_RULE_DESCRIPTION";

  public static readonly STOP_RULE_DESCRIPTION: string =
    "STOP_RULE_DESCRIPTION";

  public static readonly NEW_ACTION_RULE: string = "NEW_ACTION_RULE";

  public static readonly NEW_STOP_RULE: string = "NEW_STOP_RULE";

  public static readonly TRIGGERING_CONDITIONS: string =
    "TRIGGERING_CONDITIONS";

  public static readonly TRIGGERING_CONDITIONS_DESCRIPTION: string =
    "TRIGGERING_CONDITIONS_DESCRIPTION";

  public static readonly TRIGGERING_CONDITIONS_STEP: string =
    "TRIGGERING_CONDITIONS_STEP";

  public static readonly MESSAGE_STEP: string = "MESSAGE_STEP";

  public static readonly MESSAGE_STEP_DESCRIPTION: string =
    "MESSAGE_STEP_DESCRIPTION";

  public static readonly MESSAGE_STEP_HELP: string = "MESSAGE_STEP_HELP";

  public static readonly TRIGGERING_CONDITIONS_STEP_DESCRIPTION: string =
    "TRIGGERING_CONDITIONS_STEP_DESCRIPTION";

  public static readonly ACTIONS_STEP: string = "ACTIONS_STEP";

  public static readonly ACTIONS_STEP_DESCRIPTION: string =
    "ACTIONS_STEP_DESCRIPTION";

  public static readonly RULE_NAME_STEP: string = "RULE_NAME_STEP";

  public static readonly RULE_NAME: string = "RULE_NAME";

  public static readonly ADDITIONAL_CONDITIONS_OPTIONAL: string =
    "ADDITIONAL_CONDITIONS_OPTIONAL";

  public static readonly ADDITIONAL_CONDITIONS: string =
    "ADDITIONAL_CONDITIONS";

  public static readonly MULTI_LOOKUP_OR_TABLE_PROPERTY: string =
    "MULTI_LOOKUP_OR_TABLE_PROPERTY";

  public static readonly ITEM_SET_CONDITION: string = "ITEM_SET_CONDITION";

  public static readonly PROPERTY_CHANGE_CONDITION: string =
    "PROPERTY_CHANGE_CONDITION";

  public static readonly TRANSITION_CONDITION: string = "TRANSITION_CONDITION";

  public static readonly ATTACHMENT_CONDITION: string = "ATTACHMENT_CONDITION";

  public static readonly SAVING_OR_MOVING_PROHIBITED_IF_ITEM_IN_SET_PASSES: string =
    "SAVING_OR_MOVING_PROHIBITED_IF_ITEM_IN_SET_PASSES";

  public static readonly ITEM_SET_LABEL: string = "ITEM_SET_LABEL";

  public static readonly ITEM_SET: string = "ITEM_SET";

  public static readonly NEW_PROPERTY_CHANGE_CONDITION: string =
    "NEW_PROPERTY_CHANGE_CONDITION";

  public static readonly EDIT_PROPERTY_CHANGE_CONDITION: string =
    "EDIT_PROPERTY_CHANGE_CONDITION";

  public static readonly PROPERTY_VALUE_IS_ABOUT_TO_CHANGE: string =
    "PROPERTY_VALUE_IS_ABOUT_TO_CHANGE";

  public static readonly NEW_VALUE_CAN_BE_EMPTY: string =
    "NEW_VALUE_CAN_BE_EMPTY";

  public static readonly NEW_VALUE_CANNOT_BE_EMPTY: string =
    "NEW_VALUE_CANNOT_BE_EMPTY";

  public static readonly IS_ABOUT_TO_CHANGE: string = "IS_ABOUT_TO_CHANGE";

  public static readonly TO_A_NON_EMPTY_VALUE: string = "TO_A_NON_EMPTY_VALUE";

  public static readonly THIS_ITEM_SET_CONDITION_PASSES_WHEN: string =
    "THIS_ITEM_SET_CONDITION_PASSES_WHEN";

  public static readonly ALL_ITEMS_PASS_THE_CONDITION: string =
    "ALL_ITEMS_PASS_THE_CONDITION";

  public static readonly AT_LEAST_ONE_ITEM_PASS_THE_CONDITION: string =
    "AT_LEAST_ONE_ITEM_PASS_THE_CONDITION";

  public static readonly AT_LEAST_ONE_ITEM_DOESNT_PASS_THE_CONDITION: string =
    "AT_LEAST_ONE_ITEM_DOESNT_PASS_THE_CONDITION";

  public static readonly NONE_OF_THE_ITEMS_PASS_THE_CONDITION: string =
    "NONE_OF_THE_ITEMS_PASS_THE_CONDITION";

  public static readonly SKIP_THIS_CONDITION_IF_SET_IS_EMPTY: string =
    "SKIP_THIS_CONDITION_IF_SET_IS_EMPTY";

  public static readonly CONDITIONS_CANNOT_BE_EMPTY: string =
    "CONDITIONS_CANNOT_BE_EMPTY";

  public static readonly EDIT_ITEM_SET_CONDITION: string =
    "EDIT_ITEM_SET_CONDITION";

  public static readonly NEW_ITEM_SET_CONDITION: string =
    "NEW_ITEM_SET_CONDITION";

  public static readonly NEW_MOVE_WORKFLOW_ACTION: string =
    "NEW_MOVE_WORKFLOW_ACTION";

  public static readonly EDIT_MOVE_WORKFLOW_ACTION: string =
    "EDIT_MOVE_WORKFLOW_ACTION";

  public static readonly MOVE_WORKFLOW: string = "MOVE_WORKFLOW";

  public static readonly MOVE_WORKFLOW_OF_ITEM: string =
    "MOVE_WORKFLOW_OF_ITEM";

  public static readonly MOVE_WORKFLOW_TO_A_SPECIFIC_STEP: string =
    "MOVE_WORKFLOW_TO_A_SPECIFIC_STEP";

  public static readonly ITEM: string = "ITEM";

  public static readonly TO_STEP: string = "TO_STEP";

  public static readonly BACKUP_SOLUTION_CONFIGURATION: string =
    "BACKUP_SOLUTION_CONFIGURATION";

  public static readonly BACKUP_SOLUTION_CONFIGURATION_TIP: string =
    "BACKUP_SOLUTION_CONFIGURATION_TIP";

  public static readonly ACTUAL_WORK: string = "ACTUAL_WORK";

  public static readonly ACTUAL_WORK_AND_REMAINING_WORK: string =
    "ACTUAL_WORK_AND_REMAINING_WORK";

  public static readonly REMAINING_WORK_AND_PERCENT_WORK_COMPLETE: string =
    "REMAINING_WORK_AND_PERCENT_WORK_COMPLETE";

  public static readonly ACTUAL_WORK_REMAINING_WORK_AND_PERCENT_WORK_COMPLETE: string =
    "ACTUAL_WORK_REMAINING_WORK_AND_PERCENT_WORK_COMPLETE";

  public static readonly HIDE_PERCENT_WORK_COMPLETE: string =
    "HIDE_PERCENT_WORK_COMPLETE";

  public static readonly ATTACHMENT_OF_TYPE: string = "ATTACHMENT_OF_TYPE";

  public static readonly ATTACHMENT_MUST_EXIST_FROM_THIS_STEP: string =
    "ATTACHMENT_MUST_EXIST_FROM_THIS_STEP";

  public static readonly AN: string = "AN";

  public static readonly THE_STEP_OF: string = "THE_STEP_OF";

  public static readonly NEW_WORKFLOW_CONDITION: string =
    "NEW_WORKFLOW_CONDITION";

  public static readonly EDIT_WORKFLOW_CONDITION: string =
    "EDIT_WORKFLOW_CONDITION";

  public static readonly NEW_WORKFLOW_FILTER: string = "NEW_WORKFLOW_FILTER";

  public static readonly EDIT_WORKFLOW_FILTER: string = "EDIT_WORKFLOW_FILTER";

  public static readonly SELECT_AN_ENTITY_WITH_WORKFLOW: string =
    "SELECT_AN_ENTITY_WITH_WORKFLOW";

  public static readonly SELECT_AN_ENTITY_WITH_ATTACHMENTS_SUPPORT: string =
    "SELECT_AN_ENTITY_WITH_ATTACHMENTS_SUPPORT";

  public static readonly IS_AT_OR_BEYOND_STEP: string = "IS_AT_OR_BEYOND_STEP";

  public static readonly IS_BEYOND_STEP: string = "IS_BEYOND_STEP";

  public static readonly IS_AT_OR_BEFORE_STEP: string = "IS_AT_OR_BEFORE_STEP";

  public static readonly IS_BEFORE_STEP: string = "IS_BEFORE_STEP";

  public static readonly IS_AT_FLOW_STEP: string = "IS_AT_FLOW_STEP";

  public static readonly IS_AT_SIDE_STEP: string = "IS_AT_SIDE_STEP";

  public static readonly PROGRESS: string = "PROGRESS";

  public static readonly REGRESS: string = "REGRESS";

  public static readonly MOVE_TO_SIDE_STEP: string = "MOVE_TO_SIDE_STEP";

  public static readonly RETURN_TO_MAIN_FLOW: string = "RETURN_TO_MAIN_FLOW";

  public static readonly WORKFLOW_IS_ABOUT_TO: string = "WORKFLOW_IS_ABOUT_TO";

  public static readonly NEW_TRANSITION_CONDITION: string =
    "NEW_TRANSITION_CONDITION";

  public static readonly EDIT_TRANSITION_CONDITION: string =
    "EDIT_TRANSITION_CONDITION";

  public static readonly TO_ANY_STEP: string = "TO_ANY_STEP";

  public static readonly TO_THIS_STEP: string = "TO_THIS_STEP";

  public static readonly FROM_A_PREVIOUS_STEP_ONLY: string =
    "FROM_A_PREVIOUS_STEP_ONLY";

  public static readonly RECOMMENDED_FOR_ACTION_RULES: string =
    "RECOMMENDED_FOR_ACTION_RULES";

  public static readonly OR_BEYOND_IT: string = "OR_BEYOND_IT";

  public static readonly OR_BEFORE_IT: string = "OR_BEFORE_IT";

  public static readonly FROM_A_LATER_STEP_ONLY: string =
    "FROM_A_LATER_STEP_ONLY";

  public static readonly RETURN_TO_STEP: string = "RETURN_TO_STEP";

  public static readonly ITEM_SET_ACTION: string = "ITEM_SET_ACTION";

  public static readonly EDIT_ITEM_SET_ACTION: string = "EDIT_ITEM_SET_ACTION";

  public static readonly NEW_ITEM_SET_ACTION: string = "NEW_ITEM_SET_ACTION";

  public static readonly ATTACHMENTS_TAB: string = "ATTACHMENTS_TAB";

  public static readonly MESSAGES_TAB: string = "MESSAGES_TAB";

  public static readonly HISTORY_TAB: string = "HISTORY_TAB";

  public static readonly INTEGRATION_TAB: string = "INTEGRATION_TAB";

  public static readonly INTEGRATION: string = "INTEGRATION";

  public static readonly WORKFLOWABLE_INTEGRATIONFLAG_DISPLAY_NAME: string =
    "WORKFLOWABLE_INTEGRATIONFLAG_DISPLAY_NAME";

  public static readonly INTEGRATIONFLAG_SUCCESS: string =
    "INTEGRATIONFLAG_SUCCESS";

  public static readonly INTEGRATIONFLAG_WARNING: string =
    "INTEGRATIONFLAG_WARNING";

  public static readonly INTEGRATIONFLAG_FAILED: string =
    "INTEGRATIONFLAG_FAILED";

  public static readonly WORKFLOWABLE_INTEGRATIONINFORMATIONS_DISPLAY_NAME: string =
    "WORKFLOWABLE_INTEGRATIONINFORMATIONS_DISPLAY_NAME";

  public static readonly AN_ILIO_WILL_BE_CREATED_AND_THEN_RUN: string =
    "AN_ILIO_WILL_BE_CREATED_AND_THEN_RUN";

  public static readonly RUN_THIS_ACTION_ONLY_IF_CONDITIONS_ARE_SATISFIED: string =
    "RUN_THIS_ACTION_ONLY_IF_CONDITIONS_ARE_SATISFIED";

  public static readonly ONE_TIME: string = "ONE_TIME";

  public static readonly REOCCURRING: string = "REOCCURRING";

  public static readonly JAVASCRIPT_FUNCTON: string = "JAVASCRIPT_FUNCTON";

  public static readonly INTEGRATION_OPERATION: string =
    "INTEGRATION_OPERATION";

  public static readonly RUN_TYPE: string = "RUN_TYPE";

  public static readonly EDIT_INTEGRATION_OPERATION: string =
    "EDIT_INTEGRATION_OPERATION";

  public static readonly NEW_INTEGRATION_OPERATION: string =
    "NEW_INTEGRATION_OPERATION";

  public static readonly ACTION_RULE_TRIGGERING_CONDITIONS_STEP_DESCRIPTION: string =
    "ACTION_RULE_TRIGGERING_CONDITIONS_STEP_DESCRIPTION";

  public static readonly SKIP_THIS_ITEM_SET_CONDITION_IF_SET_IS_EMPTY: string =
    "SKIP_THIS_ITEM_SET_CONDITION_IF_SET_IS_EMPTY";

  public static readonly SET_PROPERTY_MULTI_LOOKUP_OR_TABLE: string =
    "SET_PROPERTY_MULTI_LOOKUP_OR_TABLE";

  public static readonly ITEM_CONDITIONS: string = "ITEM_CONDITIONS";

  public static readonly SPECIFY_ACTIONS_TO_BE_PERFORMED_FOR_EACH_ITEM_OF_SET: string =
    "SPECIFY_ACTIONS_TO_BE_PERFORMED_FOR_EACH_ITEM_OF_SET";

  public static readonly ITEM_SET_ACTION_NAME: string = "ITEM_SET_ACTION_NAME";

  public static readonly STOP_RULES_ARE_TRIGGERED_AFTER_ACTION_RULES: string =
    "STOP_RULES_ARE_TRIGGERED_AFTER_ACTION_RULES";

  public static readonly ACTIONS_DEFINED_HERE_WONT_BE_PERFORMED_IF_SKIP_THIS_STEP_TO_DO_DEFINE_RULE: string =
    "ACTIONS_DEFINED_HERE_WONT_BE_PERFORMED_IF_SKIP_THIS_STEP_TO_DO_DEFINE_RULE";

  public static readonly IMPORT_ENVIRONMENT_APPLICATION_PREFERENCES: string =
    "IMPORT_ENVIRONMENT_APPLICATION_PREFERENCES";

  public static readonly EXPORT_ENVIRONMENT_APPLICATION_PREFERENCES: string =
    "EXPORT_ENVIRONMENT_APPLICATION_PREFERENCES";

  public static readonly BY: string = "BY";

  public static readonly SAVE_AS_NEW: string = "SAVE_AS_NEW";

  public static readonly SAVE_THIS_ITEM_AS_NEW: string =
    "SAVE_THIS_ITEM_AS_NEW";

  public static readonly ENVIRONMENT_APPLICATION_PREFERENCE: string =
    "ENVIRONMENT_APPLICATION_PREFERENCE";

  public static readonly BY_MIDDLE_SENTENCE: string = "BY_MIDDLE_SENTENCE";

  public static readonly USE_THE_FOLLOWING_INSTRUCTION_LINE_INSTEAD_OF_THE_DEFAULT_SETTING: string =
    "USE_THE_FOLLOWING_INSTRUCTION_LINE_INSTEAD_OF_THE_DEFAULT_SETTING";

  public static readonly GRAPHICAL_INDICATOR_NAME: string =
    "GRAPHICAL_INDICATOR_NAME";

  public static readonly DISPLAY_LANGUAGES: string = "DISPLAY_LANGUAGES";

  public static readonly SELECT_LANGUAGES_TO_DISPLAY_THE_SITE: string =
    "SELECT_LANGUAGES_TO_DISPLAY_THE_SITE";

  public static readonly SET_AS_DEFAULT: string = "SET_AS_DEFAULT";

  public static readonly TRANSLATE_SOLUTION: string = "TRANSLATE_SOLUTION";

  public static readonly MSP_TRANSLATION_ADVANCED: string =
    "MSP_TRANSLATION_ADVANCED";

  public static readonly TRANSLATE_SOLUTION_OBJECTS_TO_SELECTED_LANGUAGES: string =
    "TRANSLATE_SOLUTION_OBJECTS_TO_SELECTED_LANGUAGES";

  public static readonly EXPORT_SOLUTION_OBJECT_NAMES: string =
    "EXPORT_SOLUTION_OBJECT_NAMES";

  public static readonly EXPORT_ONLY_NAMES_MISSING_TRANSLATION: string =
    "EXPORT_ONLY_NAMES_MISSING_TRANSLATION";

  public static readonly FILL_OBJECT_NAME_TRANSLATIONS: string =
    "FILL_OBJECT_NAME_TRANSLATIONS";

  public static readonly IMPORT_SOLUTION_OBJECTS_NAMES: string =
    "IMPORT_SOLUTION_OBJECTS_NAMES";

  public static readonly TRANSLATE_MSP_TO_ADDITIONAL_LANGUAGES: string =
    "TRANSLATE_MSP_TO_ADDITIONAL_LANGUAGES";

  public static readonly EXPORT_MSP_LANGUAGE_ENTRIES: string =
    "EXPORT_MSP_LANGUAGE_ENTRIES";

  public static readonly FILL_LANGUAGE_ENTRY_TRANSLATIONS: string =
    "FILL_LANGUAGE_ENTRY_TRANSLATIONS";

  public static readonly IMPORT_MSP_LANGUAGE_ENTRIES: string =
    "IMPORT_MSP_LANGUAGE_ENTRIES";

  public static readonly MSP_TRANSLATION: string = "MSP_TRANSLATION";

  public static readonly TRANSLATE_THE_SOLUTION_TO_ADDITIONAL_LANGUAGES: string =
    "TRANSLATE_THE_SOLUTION_TO_ADDITIONAL_LANGUAGES";

  public static readonly EXPORT_ONLY_ENTRIES_MISSING_TRANSLATION: string =
    "EXPORT_ONLY_ENTRIES_MISSING_TRANSLATION";

  public static readonly EXPORTING_SOLUTION_OBJECT_TRANSLATIONS: string =
    "EXPORTING_SOLUTION_OBJECT_TRANSLATIONS";

  public static readonly EXPORT_MSP_TRANSLATIONS: string =
    "EXPORT_MSP_TRANSLATIONS";

  public static readonly IMPORTING_SOLUTION_OBJECT_TRANSLATIONS: string =
    "IMPORTING_SOLUTION_OBJECT_TRANSLATIONS";

  public static readonly IMPORTING_MSP_TRANSLATIONS: string =
    "IMPORTING_MSP_TRANSLATIONS";

  public static readonly DONE_PLEASE_RELOAD_SETTINGS_IN_ORDER_FOR_CHANGES: string =
    "DONE_PLEASE_RELOAD_SETTINGS_IN_ORDER_FOR_CHANGES";

  public static readonly DONE: string = "DONE";

  public static readonly SAVE_TRANSLATION_WORKBOOK_UPPERCASE: string =
    "SAVE_TRANSLATION_WORKBOOK_UPPERCASE";

  public static readonly SAVE_TRANSLATION_WORKBOOK: string =
    "SAVE_TRANSLATION_WORKBOOK";

  public static readonly SERVER_HEALTH: string = "SERVER_HEALTH";

  public static readonly LONG_RUNNING_OPERATIONS: string =
    "LONG_RUNNING_OPERATIONS";

  public static readonly TO_SET_OPERATION_DURATION_THRESHOLDS_CLICK_APPLICATION_PREFERENCES: string =
    "TO_SET_OPERATION_DURATION_THRESHOLDS_CLICK_APPLICATION_PREFERENCES";

  public static readonly TIME: string = "TIME";

  public static readonly REFRESH: string = "REFRESH";

  public static readonly OPERATION: string = "OPERATION";

  public static readonly DURATION_MS: string = "DURATION_MS";

  public static readonly CONTEXT: string = "CONTEXT";

  public static readonly CLIENT_IP: string = "CLIENT_IP";

  public static readonly MSP_USER_NAME: string = "MSP_USER_NAME";

  public static readonly WORKSHEET_USER: string = "WORKSHEET_USER";

  public static readonly MY_WORK_POLICY_ASSIGNMENT: string =
    "MY_WORK_POLICY_ASSIGNMENT";

  public static readonly MY_WORK_POLICY_ASSIGNMENT_TEXT: string =
    "MY_WORK_POLICY_ASSIGNMENT_TEXT";

  public static readonly MY_WORK_POLICY_ASSIGNMENT_ORDER: string =
    "MY_WORK_POLICY_ASSIGNMENT_ORDER";

  public static readonly MY_WORK_POLICIES_ASSIGNMENT_ORDER_TEXT: string =
    "MY_WORK_POLICIES_ASSIGNMENT_ORDER_TEXT";

  public static readonly THE_COMPARISON_WILL_BE_DONE_USING_BOTH_DATE_AND_TIME_COMPONENTS: string =
    "THE_COMPARISON_WILL_BE_DONE_USING_BOTH_DATE_AND_TIME_COMPONENTS";

  public static readonly ENTITY_AND_FORMS_STEP_LABEL: string =
    "ENTITY_AND_FORMS_STEP_LABEL";

  public static readonly REPORTING_MODE_STEP_LABEL: string =
    "REPORTING_MODE_STEP_LABEL";

  public static readonly REPORTING_MODE: string = "REPORTING_MODE";

  public static readonly PROGRESS_COLUMN: string = "PROGRESS_COLUMN";

  public static readonly PROGRESS_COLUMN_HELP: string = "PROGRESS_COLUMN_HELP";

  public static readonly ACTUAL_WORK_AND_PROGRESS: string =
    "ACTUAL_WORK_AND_PROGRESS";

  public static readonly ACTUAL_WORK_AGAINST_ESTIMATED_WORK: string =
    "ACTUAL_WORK_AGAINST_ESTIMATED_WORK";

  public static readonly ACTUAL_WORK_UNLIMITED: string =
    "ACTUAL_WORK_UNLIMITED";

  public static readonly PERCENT_COMPLETE_ONLY: string =
    "PERCENT_COMPLETE_ONLY";

  public static readonly DAY_COLUMNS: string = "DAY_COLUMNS";

  public static readonly PERCENT_COMPLETE: string = "PERCENT_COMPLETE";

  public static readonly REMAINING_WORK: string = "REMAINING_WORK";

  public static readonly WORK: string = "WORK";

  public static readonly DAY_COLUMNS_USER_REPORT: string =
    "DAY_COLUMNS_USER_REPORT";

  public static readonly PERCENT_COMPLETE_CALCULATED_AS: string =
    "PERCENT_COMPLETE_CALCULATED_AS";

  public static readonly REMAINING_WORK_USER_REPORT: string =
    "REMAINING_WORK_USER_REPORT";

  public static readonly WORK_USER_REPORT: string = "WORK_USER_REPORT";

  public static readonly PERCENT_COMPLETE_USER_REPORT: string =
    "PERCENT_COMPLETE_USER_REPORT";

  public static readonly REMAINING_WORK_CALCULATED_AS: string =
    "REMAINING_WORK_CALCULATED_AS";

  public static readonly ACTUAL_WORK_AGAINST_ESTIMATED_WORK_HELP: string =
    "ACTUAL_WORK_AGAINST_ESTIMATED_WORK_HELP";

  public static readonly ACTUAL_WORK_UNLIMITED_HELP: string =
    "ACTUAL_WORK_UNLIMITED_HELP";

  public static readonly NOT_APPLICABLE: string = "NOT_APPLICABLE";

  public static readonly WORKSHEET_COLUMNS_BEHAVIOUR: string =
    "WORKSHEET_COLUMNS_BEHAVIOUR";

  public static readonly TASK_FORMS: string = "TASK_FORMS";

  public static readonly REPORTING: string = "REPORTING";

  public static readonly SESSION_END_MESSAGE_TEXT: string =
    "SESSION_END_MESSAGE_TEXT";

  public static readonly SESSION_END_MESSAGE_SUB_TEXT: string =
    "SESSION_END_MESSAGE_SUB_TEXT";

  public static readonly SESSION_END: string = "SESSION_END";

  public static readonly KEEP_ME_SIGNED_IN: string = "KEEP_ME_SIGNED_IN";

  public static readonly CLOSE_SESSION: string = "CLOSE_SESSION";

  public static readonly SESSION_ENDED_MESSAGE: string =
    "SESSION_ENDED_MESSAGE";

  public static readonly CREATE_APPLICATION_PREFERENCE_HEADER: string =
    "CREATE_APPLICATION_PREFERENCE_HEADER";

  public static readonly SYNC_WORK_PROPERTY_FROM_MY_WORK: string =
    "SYNC_WORK_PROPERTY_FROM_MY_WORK";

  public static readonly TYPE_A_DATE: string = "TYPE_A_DATE";

  public static readonly EXCLUDE_PROPERTY_FROM_REPORT_GENERATOR: string =
    "EXCLUDE_PROPERTY_FROM_REPORT_GENERATOR";

  public static readonly EXCLUDE_PROPERTY_FROM_EVENTS_GENERATOR: string =
    "EXCLUDE_PROPERTY_FROM_EVENTS_GENERATOR";

  public static readonly ENTITY_CATEGORY_FOR_NEW_ROW: string =
    "ENTITY_CATEGORY_FOR_NEW_ROW";

  public static readonly ENTITY_CATEGORY_FOR_NEW_ROW_NOTE: string =
    "ENTITY_CATEGORY_FOR_NEW_ROW_NOTE";

  public static readonly ENTITY_CLASS_NAME: string = "ENTITY_CLASS_NAME";

  public static readonly OVERRIDE_WORKSHEET_COLUMNS: string =
    "OVERRIDE_WORKSHEET_COLUMNS";

  public static readonly DISPLAYED_COLUMNS_MAX_3: string =
    "DISPLAYED_COLUMNS_MAX_3";

  public static readonly AVAILABLE_COLUMNS: string = "AVAILABLE_COLUMNS";

  public static readonly ORCHESTRATORS: string = "ORCHESTRATORS";

  public static readonly ORCHESTRATORS_COMPONENTS_FOR_RUNNING_INTEGRATION: string =
    "ORCHESTRATORS_COMPONENTS_FOR_RUNNING_INTEGRATION";

  public static readonly ADD_ILIOS_TO_RUN_ON_THIS_ORC: string =
    "ADD_ILIOS_TO_RUN_ON_THIS_ORC";

  public static readonly ADD_OLIOS_TO_RUN_ON_THIS_ORC: string =
    "ADD_OLIOS_TO_RUN_ON_THIS_ORC";

  public static readonly AVAILABLE_ILIOS: string = "AVAILABLE_ILIOS";

  public static readonly SELECTED_ILIOS: string = "SELECTED_ILIOS";

  public static readonly AVAILABLE_OLIOS: string = "AVAILABLE_OLIOS";

  public static readonly SELECTED_OLIOS: string = "SELECTED_OLIOS";

  public static readonly ILIOS_NOT_ADDED_TO_ANY_WILL_RUN_ON_FIRST: string =
    "ILIOS_NOT_ADDED_TO_ANY_WILL_RUN_ON_FIRST";

  public static readonly OLIOS_NOT_ADDED_TO_ANY_WILL_RUN_ON_FIRST: string =
    "OLIOS_NOT_ADDED_TO_ANY_WILL_RUN_ON_FIRST";

  public static readonly ADD_THIS_INIO_TO_AN_ORC: string =
    "ADD_THIS_INIO_TO_AN_ORC";

  public static readonly TO_RUN_THIS_OPERATION_CLICK_SETTINGS: string =
    "TO_RUN_THIS_OPERATION_CLICK_SETTINGS";

  public static readonly ORCHESTRATOR: string = "ORCHESTRATOR";

  public static readonly ADD_ORCHESTRATOR: string = "ADD_ORCHESTRATOR";

  public static readonly ITEM_INTEGRATION: string = "ITEM_INTEGRATION";

  public static readonly GENERAL_INTEGRATION: string = "GENERAL_INTEGRATION";

  public static readonly ITEM_LEVEL_INTEGRATION_OPERATION: string =
    "ITEM_LEVEL_INTEGRATION_OPERATION";

  public static readonly ORCHESTRATOR_LEVEL_INTEGRATION_OPERATION: string =
    "ORCHESTRATOR_LEVEL_INTEGRATION_OPERATION";

  public static readonly CONNECTION: string = "CONNECTION";

  public static readonly ORCHESTRATOR_2_MSP_PORT: string =
    "ORCHESTRATOR_2_MSP_PORT";

  public static readonly MSP_2_ORCHESTRATOR_PORT: string =
    "MSP_2_ORCHESTRATOR_PORT";

  public static readonly ORCHESTRATOR_HOST_NAME: string =
    "ORCHESTRATOR_HOST_NAME";

  public static readonly INSERT_ONLY_NUMBERS: string = "INSERT_ONLY_NUMBERS";

  public static readonly EXPAND: string = "EXPAND";

  public static readonly DEFAULT_WIDTH: string = "DEFAULT_WIDTH";

  public static readonly OVERRIDE_DEFAULT_WIDTH: string =
    "OVERRIDE_DEFAULT_WIDTH";

  public static readonly DO_YOU_WANT_TO_DELETE_THE_ORCHESTRATOR: string =
    "DO_YOU_WANT_TO_DELETE_THE_ORCHESTRATOR";

  public static readonly DELETE_ORCHESTRATOR: string = "DELETE_ORCHESTRATOR";

  public static readonly PROVIDERS: string = "PROVIDERS";

  public static readonly NEW_PROVIDER: string = "NEW_PROVIDER";

  public static readonly HOST_NAME: string = "HOST_NAME";

  public static readonly PORT: string = "PORT";

  public static readonly TIMEOUT: string = "TIMEOUT";

  public static readonly MSP_CONNECTION_TIMEOUT: string =
    "MSP_CONNECTION_TIMEOUT";

  public static readonly LOOKUP_PROPERTY: string = "LOOKUP_PROPERTY";

  public static readonly TABULAR_REPORTS_PROPERTY_CATEGORY: string =
    "TABULAR_REPORTS_PROPERTY_CATEGORY";

  public static readonly REPORT_TARGET: string = "REPORT_TARGET"; // Nadav Lev

  public static readonly REPORT_TARGET_FRAME_NAME: string =
    "REPORT_TARGET_FRAME_NAME"; // Nadav Lev

  public static readonly AUTO_ADD_TASKS_FROM_PREVIOUS_WEEK: string =
    "AUTO_ADD_TASKS_FROM_PREVIOUS_WEEK";

  public static readonly STEP_THREE_RELOAD_SETTINGS: string =
    "STEP_THREE_RELOAD_SETTINGS";

  public static readonly RELOAD_SETTINGS: string = "RELOAD_SETTINGS";

  public static readonly WORKSAPCE_ID: string = "WORKSAPCE_ID";

  public static readonly LICENSE_ROLE: string = "LICENSE_ROLE";

  public static readonly NOTE_THE_FIRST_BUTTON_WILL_ALWAYS_BE_DISPLAYED_IN_FULL_SIZE: string =
    "NOTE_THE_FIRST_BUTTON_WILL_ALWAYS_BE_DISPLAYED_IN_FULL_SIZE";

  private static readonly NONE_LICENSE_ROLE: string = "NONE_LICENSE_ROLE";

  private static readonly SOLUTION_DESIGNER_LICENSE_ROLE: string =
    "SOLUTION_DESIGNER_LICENSE_ROLE";

  private static readonly ADMINISTRATOR_LICENSE_ROLE: string =
    "ADMINISTRATOR_LICENSE_ROLE";

  private static readonly PROFESSIONAL_LICENSE_ROLE: string =
    "PROFESSIONAL_LICENSE_ROLE";

  private static readonly STANDARD_LICENSE_ROLE: string =
    "STANDARD_LICENSE_ROLE";

  private static readonly VIEWER_LICENSE_ROLE: string = "VIEWER_LICENSE_ROLE";

  public static readonly HELIX_ROLE: string = "HELIX_ROLE";

  public static readonly PERSISTENCEBASEDTO_INTEGRATION_IDENTIFIER_DISPLAY_NAME: string =
    "PERSISTENCEBASEDTO_INTEGRATION_IDENTIFIER_DISPLAY_NAME";

  public static readonly ENABLE_FOR_EXECUTION_CENTER: string =
    "ENABLE_FOR_EXECUTION_CENTER";

  public static readonly MILESTONES_TABLE_DESCRIPTION_PROPERTY: string =
    "MILESTONES_TABLE_DESCRIPTION_PROPERTY";

  public static readonly MILESTONES_TABLE_STATUS_PROPERTY: string =
    "MILESTONES_TABLE_STATUS_PROPERTY";

  public static readonly MILESTONES_TABLE_STATUS_DELIVERABLE_STATUS_PROPERTY: string =
    "MILESTONES_TABLE_STATUS_DELIVERABLE_STATUS_PROPERTY";

  public static readonly MILESTONES_TABLE_DUEDATE_PROPERTY: string =
    "MILESTONES_TABLE_DUEDATE_PROPERTY";

  public static readonly MILESTONES_TABLE_PROPERTY: string =
    "MILESTONES_TABLE_PROPERTY";

  public static readonly EXECUTION_CENTER_INTEGRATION: string =
    "EXECUTION_CENTER_INTEGRATION";

  public static readonly GOALS_PROPERTY: string = "GOALS_PROPERTY";
  public static readonly MILESTONES_TABLE_OWNER_PROPERTY: string =
    "MILESTONES_TABLE_OWNER_PROPERTY";

  public static readonly ACTIVITY_OWNER_PROPERTY: string =
    "ACTIVITY_OWNER_PROPERTY";

  public static readonly SIMPLE_MODE: string = "SIMPLE_MODE";

  public static readonly CSS_CLASS: string = "CSS_CLASS";

  public static readonly SUFFIX: string = "SUFFIX";

  public static readonly SUFFIX_TOOLIP: string = "SUFFIX_TOOLIP";

  public static readonly HIDE_LIST_BUTTON: string = "HIDE_LIST_BUTTON";

  public static readonly PRODUCTS: string = "PRODUCTS";

  public static readonly MANAGE_PRODUCTS: string = "MANAGE_PRODUCTS";

  public static readonly PRODUCT: string = "PRODUCT";

  public static readonly CREATE_NEW_PRODUCT: string = "CREATE_NEW_PRODUCT";

  public static readonly PRODUCT_SN: string = "PRODUCT_SN";

  public static readonly ACTION_ITEMS: string = "ACTION_ITEMS";

  public static readonly ACTION_ITEMS_CRUD_LEVEL_OF_CONTROL: string =
    "ACTION_ITEMS_CRUD_LEVEL_OF_CONTROL";

  public static readonly PRESENT_NEW_ACTION_ITEM_SECTION: string =
    "PRESENT_NEW_ACTION_ITEM_SECTION";

  public static readonly ENABLE_MARK_COMPLETE_ACTION_ITEM: string =
    "ENABLE_MARK_COMPLETE_ACTION_ITEM";

  public static readonly ENABLE_DELETE_ACTION_ITEM: string =
    "ENABLE_DELETE_ACTION_ITEM";

  public static readonly ATTACHMENTS_ITEMS: string = "ATTACHMENTS_ITEMS";

  public static readonly ATTACHMENTS_ITEMS_CRUD_LEVEL_OF_CONTROL: string =
    "ATTACHMENTS_ITEMS_CRUD_LEVEL_OF_CONTROL";

  public static readonly PRESENT_DROP_FILES_TO_ATTACH: string =
    "PRESENT_DROP_FILES_TO_ATTACH";

  public static readonly PRESENT_EDIT_BUTTON_WITH_EDIT_TITLE: string =
    "PRESENT_EDIT_BUTTON_WITH_EDIT_TITLE";

  public static readonly ENABLE_DELETE_ATTACHMENT_BUTTON: string =
    "ENABLE_DELETE_ATTACHMENT_BUTTON";

  public static readonly PARTICIPANTS: string = "PARTICIPANTS";

  public static readonly FILTER_PARTICIPANTS: string = "FILTER_PARTICIPANTS";

  public static readonly BALANCE: string = "BALANCE";

  public static readonly PERCENT_CONSUMPTION: string = "PERCENT_CONSUMPTION";

  public static readonly PREDICTED_WORK: string = "PREDICTED_WORK";

  public static readonly PERCENT_PREDICTED_CONSUMPTION: string =
    "PERCENT_PREDICTED_CONSUMPTION";

  public static readonly COMPLETE_PERCENTAGE: string = "COMPLETE_PERCENTAGE";
  /****************************************************************/

  private _currentLocale = "en";

  private _languages: Map<string, any> = new Map<string, any>();

  private _languagesMap: Map<string, any> = new Map<string, any>();

  private static instance: LanguagesPresentationModel;

  private constructor() {
    AppCacheModule.FlexSettings.translations.forEach(lang => {
      console.log("lang type is " + typeof lang)

      const keyMap = new Map<string, string>()
      for (const pair of lang.value) {
        keyMap.set(pair.key, pair.value)
      }
      this.languagesMap.set(lang.key as string, keyMap)
    })

    console.log("langMap: " + JSON.stringify(this.languagesMap))
  }

  public static getInstance(): LanguagesPresentationModel {
    if (!LanguagesPresentationModel.instance) {
      LanguagesPresentationModel.instance = new LanguagesPresentationModel()
    }

    return LanguagesPresentationModel.instance
  }

  get languages(): Map<string, any> {
    return this._languages
  }

  set languages(value: Map<string, any>) {
    this._languages = value
  }

  get languagesMap(): Map<string, any> {
    return this._languagesMap
  }

  set languagesMap(value: Map<string, any>) {
    this._languagesMap = value
  }

  get currentLocale(): string {
    return this._currentLocale
  }

  set currentLocale(value: string) {
    if (this._currentLocale === value) {
      return
    }

    this._currentLocale = value
  }

  public getLocalizedString(key: string): string {
    const currentMap = this.getCurrentLangMap()
    const rs = currentMap.get(key)
    return rs
  }

  public getCurrentLangMap() {
    return this.languagesMap.get(this.currentLocale)
  }

  public getLocalizedStringOfPrimaryLanguage(key: string): string {
    return this.languagesMap
      .get(LanguagesPresentationModel.PRIMARY_LANGUAGE_INITIALS)
      .get(key)
  }

  public getTranslation(locale: string, key: string): string {
    const localeMap = this.languagesMap.get(locale)
    let result = key
    if (localeMap) {
      result = localeMap.get(key)
    } else {
      console.warn("enable to find the locale for " + locale)
    }
    return result
  }

  // public changeLocale() {
  //     if (this.languagesMap.size == 2) {
  //         if (this.currentLocale == this.languagesMap[0]) {
  //             this.currentLocale = this.languagesMap[1];
  //         }
  //         else {
  //             this.currentLocale = this.languagesMap[0];
  //         }
  //     }
  // }
}
