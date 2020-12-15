import React, { useState } from 'react';
import { DataTable } from 'react-native-paper';
import { StyleSheet,Alert,ScrollView,Keyboard, Button, View, Text,TouchableOpacity,TextInput } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen=({ navigation,route })=> {
  
   const [getText,setText]=useState(0); 
   const [getDisText,setDisText]=useState();
   const [getPer,setPer]=useState(0)
   const [getList,setList]=useState([]);
   const [getYS,setYS]=useState(0);
    
   const onPressSave=()=>{
     if(getText.length>=1){
          var x=getText
          var y=getPer
          var l=x*(y/100);
          var z=parseFloat(x).toFixed(2)-parseFloat(l).toFixed(2);
          var cal=parseFloat(z).toFixed(2);     
          setList([
              ...getList,
              {key: Math.random().toString(),text:x,per:y,fp:cal}
              ])
        setText('')
        setPer('')
        setYS('')
        setDisText('')
     }    
  }
   
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
      <TouchableOpacity>
          <Text style={styles.title}>Discount Calculator</Text>
      </TouchableOpacity>
      <View style={{borderWidth:2,padding:20,borderRadius:12}}>
      <View style={styles.outview}>  
          <TextInput
              placeholder="Enter Price"
              style={styles.textinput}
              onChangeText={text=>setText(text)}
              value={getText}
              keyboardType="Decimal-pad"
            />
      </View>
      <View style={styles.outview}>    
         <TextInput
              placeholder="Enter Percentage"
              style={styles.textinput}
              onChangeText={text => setPer(text)}
              value={getPer}
              keyboardType="Decimal-pad"
            />
        </View>
        
       <View style={styles.outview}>  
          <Text style={styles.distext} >Final Price:  {getText>-1 ? parseFloat(getText-getText*(getPer/100).toFixed(2)): setText(0)}</Text>
       </View>
        <View style={styles.outview}>  
          <Text style={styles.distext}>You Saved:  {getPer>-1 && getPer<101 ? parseFloat(getText*(getPer/100).toFixed(2)): setPer(0)}</Text>
       </View>

      <TouchableOpacity onPress={onPressSave} >
          <Text style={styles.texstyles}>SAVE</Text>           
      </TouchableOpacity>


       React.useLayoutEffect(() =>{navigation.setOptions({
       headerRight: () => (<Button title="See History" onPress={() => navigation.navigate('History',{text:getText,per:getPer,save:getYS,fp:getDisText,getlist:getList,setlist:setList})}/>
      ),
    })
  }  
        </View>      
    </View>
    </View>
  );
}

const History=({ navigation ,route})=> {

  const text=route.params.text;
  const per=route.params.per;
  const save=route.params.save;
  const fp=route.params.fp;
  const [getList,setList]=useState(route.params.getlist);
  const [gtext,stext]=useState()

  const deleteitem=(itemkey)=>{
    setList(list => getList.filter(item=>item.key!=itemkey));
  }
  return (
  <View style={styles.container}> 
            
      React.useLayoutEffect(() =>{navigation.setOptions({
       headerLeft: () => (<Button title="Back" onPress={() => navigation.navigate('Home',{getListofHistory:getList,setListofHistory:setList})}/>
      ),
    })
  }
  
  <DataTable>
    <DataTable.Header>
      <DataTable.Title  style={{flex:1,borderWidth:1}}>SR#</DataTable.Title>
      <DataTable.Title style={{flex: 4,borderWidth:1}}>Orginal Price</DataTable.Title>
      <DataTable.Title numeric style={{flex: 3,borderWidth:1}}>Discount</DataTable.Title>
      <DataTable.Title numeric style={{flex: 4,borderWidth:1}}>Final Price</DataTable.Title>
      <DataTable.Title style={{flex: 3,borderWidth:1}}>Delete</DataTable.Title>
    </DataTable.Header>
{getList.map((item,index)=>  
    <DataTable.Row>
      <DataTable.Cell style={{fkex:1,borderWidth:1}}>{index+1}</DataTable.Cell>
      <DataTable.Cell style={{flex: 4,borderWidth:1}}>{item.text}</DataTable.Cell>
      <DataTable.Cell numeric style={{flex: 3,borderWidth:1}}>{item.per}</DataTable.Cell>
      <DataTable.Cell numeric style={{flex: 4,borderWidth:1}}>{item.fp}</DataTable.Cell>
      <DataTable.Cell style={{flex: 3,borderWidth:1}}>
       <TouchableOpacity onPress={()=>deleteitem(item.key)}>
                <View style={styles.smallview}> 
                     <Text style={styles.smalltext}>X</Text>                   
    );
                </View>
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
    )}
  </DataTable>
</View>     
  );
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
          headerStyle:{
            backgroundColor:"lightblue"
          }
      }}
      >
        <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title:'Home page',
          headerStyle:{
            backgroundColor:"lightblue"
          },
          }}
        />
        <Stack.Screen name="History" component={History} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  textinput:{
    borderColor:'blue',
    width:'99%',
    fontSize:16,
    padding:10,
    borderBottomWidth:2,
  },
  distext:{
    fontSize:16,
    borderBottomColor:"blue",
    borderWidth:2,
    width:"95%",
    padding:10,
  },
 outview:{
    justifyContent:"space-between",
    flexDirection:"row",
    width:"90%",
    alignItems:"center",
    paddingLeft:40,  
  },
  title:{
    fontSize:24,
    color:'`#008b8b',
    fontWeight:"bold",
    backgroundColor:"darkgray",
    borderRadius:15,
    padding:10,
    paddingLeft:40,
    paddingBottom:20,
    paddingRight:30, 
    justifyContent:"center",
    alignItems:"center",
  },
  texstyles:{
    backgroundColor:"green",
    borderRadius:15,
    padding:10,
    justifyContent:"center",
    alignItems:"center",
    color:"white",
    fontWeight:"bold",
    paddingLeft:90,
    paddingRight:20, 
    marginTop:20,
  },
  smallview:{
    backgroundColor:"red", 
    borderRadius:50, 
    padding:5,
    width:30,
   justifyContent:"center",
   alignItems:"center",
  },
  smalltext:{
    fontSize:26,
    fontWeight:"bold"
  },
  container: {
    flex:1,
    backgroundColor:'#ecf0f1',
    paddingTop:5,
    borderColor:"black",
    borderWidth:2,
    borderRadius:12,
  },
 });
export default App;
