import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default function summaryScreen ( {route} ) {
    const {calories, fat, carbs, protein} = route.params

    const calculateActualCalories = () => {
      const fatCalories = 4 * fat
      const carbCalories = 4 * carbs
      const proteinCalories = 9 * protein

      return fatCalories + carbCalories + proteinCalories
    }

    const calculatePercentError = () => {
      return Math.abs(((calculateActualCalories() - calories)/calories) * 100)
    }

    const table = {
      tableList: ['CALORIES', 'FAT', 'CARBOHYDRATE', 'PROTEIN'],
      tableData: [
        [`Listed: ${calories}       Actual: ${calculateActualCalories()}`],
        [`${fat} g`],
        [`${carbs} g`],
        [`${protein} g`],
      ]
    }

    const tableSummary = {
      tableList: ['PERCENTAGE ERROR', 'FAT', 'CARBOHYDRATE', 'PROTEIN'],
      tableData: [
        [`${Math.round(calculatePercentError())}%`],
        [`${fat} g  ✕  9 calories per gram of fat`],
        [`${carbs} g  ✕  4 calories per gram of carbohydrates`],
        [`${protein} g  ✕  4 calories per gram of protein`],
      ]
    }

    return (
      <View style={styles.container}>
        <Image source = {require('../assets/caloreye.png')} style={styles.eye} height={24} width={40} />
        <Table borderStyle={{borderWidth: 0}}>
          <Row style={styles.head} flexArr={[1,2,1,1]} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={table.tableList} style={styles.title} heightArr={[28,28]} textStyle={styles.textTitle}/>
            <Rows data={table.tableData} flexArr={[1, 0.8]} style={styles.row} textStyle={styles.textRow}/>
          </TableWrapper>
        </Table>
        <Text style = {{paddingTop: 15, paddingBottom: 15, fontSize: 22}}>Breakdown of Calorie Calculations</Text>
        <Table borderStyle={{borderWidth: 0}}>
          <Row style={{...styles.head, backgroundColor: '#f7f7f7'}} flexArr={[1,2,1,1]} textStyle={styles.text}/>
          <TableWrapper style={{...styles.wrapper, backgroundColor: '#f7f7f7'}}>
            <Col data={tableSummary.tableList} style={{...styles.title, backgroundColor: '#f7f7f7'}} heightArr={[28,28]} textStyle={{...styles.textTitle, color: '#999b9e'}}/>
            <Rows data={tableSummary.tableData} flexArr={[1, 0.8]} style={{...styles.row, backgroundColor: '#f7f7f7'}} textStyle={styles.textRow}/>
          </TableWrapper>
        </Table>
        <View style = {styles.personContainer}>
          <Image
            style = {styles.person}
            source={require('../assets/person-summaryscreen.png')}
          />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: '#f7f7f7' },
  head: {  height: 50,  backgroundColor: '#000' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5, backgroundColor: '#18181a'},
  row: {  height: 30, paddingRight: 12, backgroundColor: '#fff' },
  textTitle: { fontSize: 18, color: '#ffffff', textAlign: 'left'},
  textRow: { fontSize: 18, color: '#252626',textAlign: 'right'},
  eye: {
    justifyContent: 'flex-end',
    marginBottom: 35
  },
  personContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  person: {
    marginBottom: 325,
    width: 205,
    height: 325
  }
});

