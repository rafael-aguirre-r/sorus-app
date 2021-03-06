import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons'
import { View } from 'react-native';

export default function ProductView({ route, navigation }) {

  const [item, setItem] = useState({})
  const [price, setPrice] = useState(0)

  useEffect(() => {
    const item = route.params
    setItem(item);
    navigation.setOptions({ headerShown: false });
    setPrice(item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
  }, [])

  const handlePayment = () => {
    const itemData = {
      ...item,
      type: 'product'
    }
    navigation.navigate('Payment', itemData)
  }

  const handleOpinions = () => {
    navigation.navigate('Opinions', item)
  }

  return <Container>
    <StatusBar barStyle='light-content' />
    <ProductBackground source={{ uri: item.image }}>
      <SafeAreaView>
        <MenuBar>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back>
              <AntDesign name="arrowleft" size={32} color="#FFF" style={styles.text_shadow} />
              <Text style={[styles.text_shadow, { marginLeft: 10, fontSize: 20, fontFamily: 'PoppinsBold' }]}>Volver</Text>
            </Back>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Review", item)}>
            <AntDesign name="star" size={32} color="#FFF" style={[{ marginTop: 30 }, styles.text_shadow]} />
          </TouchableOpacity>
        </MenuBar>
        <MainProduct>
          <Text style={[{ fontSize: 32, fontFamily: 'PoppinsBold' }, styles.text_shadow]}>{item.name}</Text>
          <Divider />
          <Text style={[{ fontSize: 24, fontFamily: 'PoppinsBold' }, styles.text_shadow]}>Categoria</Text>
          <Text style={[{ fontSize: 24, fontFamily: 'PoppinsBold' }, styles.text_shadow]}>$ {price}</Text>
        </MainProduct>
        {
          !item.is_offer
            ? <Button onPress={handlePayment}>
              <Text style={{ fontSize: 18, fontFamily: 'PoppinsBold' }}>Comprar</Text>
            </Button>
            : null
        }
      </SafeAreaView>
    </ProductBackground>
    <DescriptionContainer style={styles.border_description}>
      <Text dark style={{ fontSize: 24, fontFamily: 'PoppinsBold' }}>Descripcion</Text>
      {
        !item.is_offer
          ? <Text dark >Stock Disponible: {item.stock}</Text>
          : null
      }
      <Text dark >{item.description}</Text>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <TouchableOpacity onPress={handleOpinions} style={styles.button}>
          <Text style={{ fontSize: 13, fontFamily: 'PoppinsBold' }}>Opiniones</Text>
        </TouchableOpacity>
      </View>
    </DescriptionContainer>
  </Container>;
}

const styles = StyleSheet.create({
  text_shadow: {
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 13,
    textShadowColor: '#000',
  },
  border_description: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#312244',
    paddingTop: 5,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20
  }
})

const Container = styled.View`
    flex: 1;
    background-color: #FFF;
`;

const Text = styled.Text`
    color: ${(props) => (props.dark ? "#000" : "#FFF")};
    font-family: "Poppins";
    fontWeight: bold;
`;

const ProductBackground = styled.ImageBackground`
    width: 100%;
    height: 70%;
`;

const MenuBar = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
`;

const Back = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 30px;
`;

const MainProduct = styled.View`
    padding: 0 32px;
    margin: 200px 0 32px 0;
`;

const Divider = styled.View`
    border-bottom-color: #FFF;
    border-bottom-width: 2px;
    width: 150px;
    margin 8px 0;
`;

const Button = styled.TouchableOpacity`
    margin: -17px 0 48px 32px;
    background-color: rgba(49, 18, 69, 1);
    align-self: flex-start;
    padding: 6px 18px;
    border-radius: 100px;
`;

const DescriptionContainer = styled.View`
    padding: 32px;
    background-color: #e9e9e9;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
`;
