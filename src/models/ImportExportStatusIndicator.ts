export enum MessageType {
      INFO = 0;
      WARNING = 1;
     ERROR = 2;
}
export class ImportExportStatusIndicator {   
myspType="ImportExportStatusIndicator"
    message:string |null=null;

    done=false;

    messageType=0;

    timeStamp:Date =new Date();
}