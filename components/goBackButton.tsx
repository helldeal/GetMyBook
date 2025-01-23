import React from "react";
import { ArrowLeft } from "react-native-feather";

// COMPOSANT BOUTON POUR RETOUR EN ARRIERE DES PAGES
const GoBackButton = ({ navigation }: any) => {
  return (
    <ArrowLeft
      height={30}
      width={30}
      color={"#440000"}
      onPress={() => navigation.goBack()}
    />
  );
};

export default GoBackButton;
