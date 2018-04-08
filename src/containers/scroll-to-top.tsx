import React from 'react';
import {withRouter} from 'react-router-dom';

export interface ScrollToTopProps {
    location: string;
}
class ScrollToTop extends React.Component<ScrollToTopProps,any> {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scroll(0, 0);
        }
    }
    render() {
        return (<div>
            {this.props.children}
        </div>);
    }
}
export default withRouter(ScrollToTop);