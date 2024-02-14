import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

const { width } = Dimensions.get("window");

export const Card = ({
  info,
  anotacoes,
  setAnotacoes,
  setEstado,
  setEdicao,
  setNova,
}) => {
  const editar = () => {
    setEdicao(info.id);
    setNova(info.text);
    setEstado("editar");
  };

  const deletar = () => {
    const alterado = anotacoes.filter((note) => note.id !== info.id);
    setAnotacoes(alterado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textContent}>{info.text}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={editar}>
          <Icon name="pencil" size={20} style={styles.editBtn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deletar}>
          <Icon name="trash" size={20} style={styles.removeBtn} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#069",
  },
  textContent: {
    fontFamily: "Lobster_400Regular",
    fontSize: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  editBtn: {
    backgroundColor: "#fe2",
    padding: 10,
    borderRadius: 10,
    width: width / 3,
    textAlign: "center",
  },
  removeBtn: {
    backgroundColor: "#a00",
    color: "#eee",
    padding: 10,
    borderRadius: 10,
    width: width / 3,
    textAlign: "center",
  },
});
