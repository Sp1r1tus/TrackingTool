import * as React from 'react';
import Grid from '../src/Grid';
import { IGridData } from '../model/common_models';
import { GET_TRACKINGTOOL_LIST } from './webservice/index';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

interface IMyState {
    MyData: IGridData[];
    isLoading: boolean;
}

interface IMyProps {
    nothing?: any;
}

let TRACKING_TOOL_DATA: any;

class App extends React.Component<IMyProps, IMyState>{
    constructor(props: IMyProps) {
        super(props);
        this.state = {
            isLoading: true,
            MyData: [
                {
                    ID: 0,
                    App_Name: '',
                    PC_Name: '',
                    User_Name: '',
                    Last_Update: ''
                }
            ]
        }
    };

    public componentWillMount = async () => {

        // hole alle Daten
        TRACKING_TOOL_DATA = await GET_TRACKINGTOOL_LIST();
        await this.setState({
            MyData: TRACKING_TOOL_DATA,
            isLoading: false
        })
    }

    public render() {
        const { isLoading } = this.state;

        return (
            <div>
                <Fabric>
                    <h1> Tracking Tool - Monitoring </h1>
                    {
                        !isLoading
                            ?
                            <div>
                                <Grid GridData={this.state.MyData} />
                            </div>
                            :
                            <div style={{ height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <Spinner size={SpinnerSize.large} label="Loading application..." ariaLive="assertive" />
                            </div>
                    }
                </Fabric>

            </div>
        );
    }
}

export default App;