import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { numberWithCommas } from '../utils/formatter';
import { theme } from '../constants';

const SliderLabel = (props) => {
  const [editing, Isediting] = useState(false);
  const inputRef = useRef();

  return (
    <View style={styles.measure}>
      <Text style={styles.caption}> {props.label}</Text>

      <View style={{ flexDirection: 'row' }}>
        {props.caption === 'Rs.' ? <Text style={{ marginTop: 5 }}>Rs. </Text> : null}
        <TextInput
          value={`${props.value}`}
          keyboardType="numeric"
          numeric
          editable={editing}
          selectTextOnFocus={editing}
          ref={inputRef}
          onChangeText={(text) => {
            let num = isNaN(parseInt(text)) ? 0 : parseInt(text);
            num = props.caption === 'Rs. ' && num === 0 ? 1 : num;
            num = num >= props.max ? props.max : num;
            props.onChange(parseFloat(num));
          }}
        />
        {props.caption !== 'Rs.' ? <Text style={{ marginTop: 5 }}>{props.caption} </Text> : null}
        {editing === false ? (
          <Icon
            name="pencil"
            onPress={() => {
              Isediting(true);
              setTimeout(() => inputRef.current.focus(), 0);
            }}
            size={20}
            color={theme.colors.tertiary}
            style={{ marginLeft: theme.sizes.base }}
          />
        ) : (
          <Icon
            name="check"
            onPress={() => {
              Keyboard.dismiss();
              Isediting(false);
            }}
            size={20}
            color={theme.colors.tertiary}
            style={{ marginLeft: theme.sizes.base }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  caption: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: theme.sizes.font,
  },
  measure: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: theme.sizes.base * 0.5,
    marginLeft: theme.sizes.base,
    marginTop: theme.sizes.base,
  },
});
export { SliderLabel };
