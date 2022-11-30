import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  GanttComponent,
  TaskFieldsModel,
  ColumnsDirective,
  ColumnDirective,
  Edit,
  Inject,
  Toolbar,
  Selection,
} from "@syncfusion/ej2-react-gantt";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { isArgumentsObject } from "util/types";

const baseUrl = "http://82.202.204.94/tmp/test.php";

export const GanttInner = () => {
  const [dataTask, setDataTask] = useState([]);
  console.log("dataTask", dataTask);

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      const response = res.data.chart;

      setDataTask(response);
    });
  }, []);

  let ganttInst: GanttComponent | null;

  const editOptions: any = {
    allowEditing: true,
    module: "Auto",
    allowAdding: true,
    allowDeleting: true,
  };

  const taskValues: TaskFieldsModel = {
    id: "id",
    name: "title",
    startDate: "period_start",
    child: "sub",
    duration: "Duration",
    progress: "Progress",
    resourceInfo: "resources",
  };
  const customizeColumn = (props: any) => {
    if (props.ganttProperties.resourceNames) {
      return (
        <div>
          <img
            src={"#" + props.ganttProperties.resourceNames + ".png"}
            alt=""
          />
        </div>
      );
    }
  };
  const customizeHeader = (props: any) => {
    return <span className="">img</span>;
  };

  const OnButtonClick = (arg: any) => {
    let selectionModule = (ganttInst as GanttComponent).selectionModule;
    selectionModule.selectRow(3);
  };

  const preventRowSelection = (args: any) => {
    if (args.data.id === 2) args.cancel = true;
  };

  if (!Object.keys(dataTask).length) return null;

  return (
    <div>
      <ButtonComponent onClick={OnButtonClick}>Select</ButtonComponent>

      <GanttComponent
        ref={(gantt) => (ganttInst = gantt)}
        taskFields={taskValues}
        dataSource={[dataTask]}
        editSettings={editOptions}
        rowSelecting={preventRowSelection}
        labelSettings={{ rightLabel: "title" }}
        toolbar={[
          "Add",
          "Edit",
          "Delete",
          "Update",
          "Cancel",
          "ExpandAll",
          "CollapseAll",
        ]}
        allowSelection={true}>
        <Inject services={[Edit, Toolbar, Selection]}></Inject>
        <ColumnsDirective>
          <ColumnDirective
            field="img"
            headerTemplate={customizeHeader}
            width="100"
            template={customizeColumn}></ColumnDirective>
          <ColumnDirective field="id" headerText="ID"></ColumnDirective>
          <ColumnDirective field="title" headerText="NAME"></ColumnDirective>
          <ColumnDirective
            field="period_start"
            format="dd-MMM-yy"></ColumnDirective>
          <ColumnDirective field="id" headerText="ID"></ColumnDirective>
        </ColumnsDirective>
      </GanttComponent>
    </div>
  );
};
