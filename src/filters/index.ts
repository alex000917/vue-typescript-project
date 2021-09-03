import { ApplicationPreference } from "@/models/ApplicationPreference";
import { Entity } from "@/models/Entity";
import { KeyValue } from "@/models/KeyValue";
import { BaseProperty } from "@/models/Properties";
import { ApplicationPreferenceFactory } from "@/models/Utils/ApplicationPreferenceFactory";
import { ConditionUtils } from "@/models/Utils/ConditionUtils";
import { PropertyFactory } from "@/models/Utils/PropertyFactory";
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { Input } from "element-ui";
import moment from "moment";
// Set utils function parseTime to filter
export { parseTime } from "@/utils";

// Filter for article status
export const articleStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: "success",
    draft: "info",
    deleted: "danger"
  };
  return statusMap[status];
};

// Filter to uppercase the first character
export const uppercaseFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toTagString = async (item: any) => {
  console.log("toTagString >" + typeof item);

  if (typeof item === "object") {
    // check if item category . then its Preference
    if (item.category) {
      const pref = item as ApplicationPreference;

      return pref.displayName;
    }
    console.log(typeof item);
    // if item.parts then its PropertyPaths
    if (Array.isArray(item)) {
      let str = "";
      for (const part of item) {
        if (Array.isArray(part)) {
          let entity: Entity | null = null;
          for (const p of part) {
            if (p.value) {
              entity = await EntitiesModule.getEntity(p.value);

              str += entity.displayName + " ; ";
            } else {
              const property = entity?.properties.find(
                x => x.systemName === p.key
              );
              str += property?.displayName;
            }
          }
          return str;
        } else {
          str += "[ " + part + " ]";
        }
      }
    }
  }

  return "[ " + item + " ]";
};

export const toLocalDateString = (dateNumber: number) => {
  const date = new Date(dateNumber);
  return date.toDateString();
};

export const dateFormat = (value: any) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYY");
  }
};

export const dateTimeFormat = (value: any) => {
  if (value) {
    const val =Date.parse(value).toLocaleString()
    return moment(String(val)).format("DD/MM/YYY J:NN");
  }
};

export const systemDateFormat = (value: any) => {
  if (value) {
    const val =Date.parse(value).toLocaleString()
    return moment(String(val)).format("dd/MM/yyyy");
  }
};
export const systemDateTimeFormat = (value: any) => {
  if (value) {
    const val =Date.parse(value).toLocaleString()
    return moment(String(val)).format("dd/MM/yyyy HH:mm");
  }
};
export const numToDate = (num: number) => {
  var day = new Date(num);
  var dd:any = day.getDate();
  var mm:any = day.getMonth() + 1;
  var yyyy = day.getFullYear();
  var h:any = day.getUTCHours();
  var m:any = day.getUTCMinutes();
  var s:any = day.getUTCSeconds();
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  return dd + "/" + mm + "/" + yyyy + " " + h + ":" + m;
};
