import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { theme } from "../../theme";

export function Form() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
