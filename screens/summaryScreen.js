import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default class summaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableList: ['CALORIES', 'FAT', 'CARBOHYDRATE', 'PROTEIN'],
      tableData: [
        ['Listed: 130', 'Actual: 200'],
        ['0 g'],
        ['33 g'],
        ['0 g'],
      ]
    }
  }
 
  render() {
    const state = this.state;                       
    return (
      <View style={styles.container}>
        <Image source = {require('../assets/caloreye.png')} style={styles.eye} height={24} width={40} />
        <Table borderStyle={{borderWidth: 0}}>
          <Row data={state.tableHead} style={styles.head} flexArr={[1,2,1,1]} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableList} style={styles.title} heightArr={[28,28]} textStyle={styles.textTitle}/>
            <Rows data={state.tableData} flexArr={[1, 0.8]} style={styles.row} textStyle={styles.textRow}/>
          </TableWrapper>
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: '#f7f7f7' },
  head: {  height: 50,  backgroundColor: '#000' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 3, backgroundColor: '#18181a'},
  row: {  height: 30, paddingRight: 10, backgroundColor: '#fff' },
  textTitle: { fontSize: 14, color: '#ffffff', textAlign: 'left'},
  textRow: { fontSize: 14, color: '#252626',textAlign: 'right'},
  eye: {
    justifyContent: 'flex-end',
    marginBottom: 35
},
});

