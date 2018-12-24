import React from "react";
import styles from "./example2.less";
import { connect } from "dva";

@connect()
export default class Example2 extends React.Component {
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({ type: "example/getUserList" });
    }

    render() {
        return (
            <div className={ styles.example2 }>
                example2
            </div>
        )
    }
}