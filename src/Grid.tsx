import * as React from 'react';
import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    SelectionMode,
    IDetailsRowProps,
    IDetailsRowStyles,
    DetailsRow
} from 'office-ui-fabric-react/lib/DetailsList';
import { IGridData } from '../model/common_models';
import { mergeStyles, getTheme } from 'office-ui-fabric-react/lib/Styling';
import * as moment from 'moment';

const theme = getTheme();

const Columns: IColumn[] = [
    {
        key: 'Application_ID',
        name: 'Application_ID',
        fieldName: 'Application_ID',
        minWidth: 0,
        maxWidth: 0,
        
        isResizable: false,
        ariaLabel: 'Operations for name'
    },
    {
        key: 'Application_Name',
        name: 'Application_Name',
        fieldName: 'Application_Name',
        minWidth: 300,
        maxWidth: 300,
        isResizable: true,
        ariaLabel: 'Operations for name'
    },
    {
        key: 'ComputerName',
        name: 'ComputerName',
        fieldName: 'ComputerName',
        minWidth: 200,
        maxWidth: 200,
        isResizable: true,
        ariaLabel: 'Operations for value'
    },
    {
        key: 'BenutzerName',
        name: 'BenutzerName',
        fieldName: 'BenutzerName',
        minWidth: 200,
        maxWidth: 200,
        isResizable: true,
        ariaLabel: 'Operations for value'
    },
    {
        key: 'Last_Update',
        name: 'Last_Update',
        fieldName: 'Last_Update',
        minWidth: 250,
        maxWidth: 250,
        isResizable: true,
        ariaLabel: 'Operations for value'
    },
    {
        key: 'Interval',
        name: 'Interval',
        fieldName: 'Interval',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        ariaLabel: 'Operations for value'
    }
];

interface IMyState {
    nothing?: any;
}

interface IMyProps {
    GridData: IGridData[];
}

class Grid extends React.Component<IMyProps, IMyState>{
    constructor(props: IMyProps) {
        super(props);
        this.state = {
            nothing: 'hallo'
        }
    };


    public onRenderItemColumn(item: any, index: number, column: IColumn) {
        const fieldContent = item[column.fieldName as keyof any] as string;

        /*  switch (column.key) {
              case 'Application_Name':
                  return (
                      <span data-selection-disabled={true} className={mergeStyles({ fontWeight: 'bold', fontSize: 20, color: 'green', height: '100%', display: 'block' })}>
                          {fieldContent}
                      </span>
                  );
              default:
                  return <span>{fieldContent}</span>;
          }    */
        return (
            <span data-selection-disabled={true} className={mergeStyles({ fontSize: 20, height: '100%', display: 'block' })}>
                {fieldContent}
            </span>
        );
    }



    public onRenderRow = (props: IDetailsRowProps): JSX.Element => {
        const x = moment()
        const y = moment(props.item.Last_Update)
        const duration = x.diff(y, 'minute')
        const customStyles: Partial<IDetailsRowStyles> = {};
        if (duration > props.item.Interval || props.item.Application_ID === 999) {
            customStyles.root = { color: theme.palette.redDark, fontWeight: "bold" };
        }
        return <DetailsRow {...props} styles={customStyles} />;
    };

    public render() {
        return (
            <div>
                <DetailsList
                    onRenderRow={this.onRenderRow}
                    items={this.props.GridData}
                    columns={Columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    onRenderItemColumn={this.onRenderItemColumn}
                    selectionMode={SelectionMode.none}
                />
            </div>
        );
    }
}

export default Grid;