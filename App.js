import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Card } from "./components/Card";
import { Header } from "./components/Header";

import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [estado, setEstado] = useState("leitura");
  const [anotacoes, setAnotacoes] = useState([]);
  const [nova, setNova] = useState("");
  const [edicao, setEdicao] = useState(0);
  const [fontLoaded] = useFonts({ Lobster_400Regular });

  useEffect(() => {
    const buscaStorage = async () => {
      const notas = await AsyncStorage.getItem("@tomeNota:anotacoes");

      setAnotacoes(JSON.parse(notas));
    };
    buscaStorage();
  }, []);

  useEffect(() => {
    const armazenaStorage = async () => {
      await AsyncStorage.setItem(
        "@tomeNota:anotacoes",
        JSON.stringify(anotacoes)
      );
    };
    armazenaStorage();
  }, [anotacoes]);

  const adicionarAnotacao = () => {
    if (nova !== "") {
      const novaAnotacao = {
        id: anotacoes.length !== 0 ? anotacoes[anotacoes.length - 1].id + 1 : 1,
        text: nova,
      };

      setAnotacoes([...anotacoes, novaAnotacao]);
      setNova("");
      setEstado("leitura");
    }
  };

  const editarAnotacao = () => {
    if (nova !== "") {
      const editado = {
        id: edicao,
        text: nova,
      };

      setAnotacoes([
        ...anotacoes.map((text) => (text.id !== edicao ? text : editado)),
      ]);
      setNova("");
      setEstado("leitura");
      setEdicao(0);
    }
  };

  if (!fontLoaded) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (estado == "leitura") {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Header />
        <ScrollView>
          {anotacoes?.length === 0 ? (
            <Text style={styles.info}>
              Adicione uma nova anotação clicando no botão abaixo!
            </Text>
          ) : (
            anotacoes.map(({ id, text }) => (
              <Card
                key={id}
                info={{ id, text }}
                anotacoes={anotacoes}
                setAnotacoes={setAnotacoes}
                setEstado={setEstado}
                setEdicao={setEdicao}
                setNova={setNova}
              />
            ))
          )}
        </ScrollView>
        <View style={styles.btnContainer}>
          <View></View>
          <TouchableOpacity
            onPress={() => setEstado("adicionar")}
            style={styles.btnAdd}
          >
            <Text
              style={{
                color: "white",
                fontSize: 30,
                position: "relative",
                bottom: 2,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Header />
        <ScrollView>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) => setNova(text)}
            value={nova}
            placeholder="Digite a nova anotação!"
            style={{
              fontFamily: "Lobster_400Regular",
              padding: 20,
              fontSize: 20,
            }}
          ></TextInput>
        </ScrollView>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              setEstado("leitura");
              setEdicao(0);
              setNova("");
            }}
            style={styles.btnCancel}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontFamily: "Lobster_400Regular",
              }}
            >
              Sair
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              estado === "adicionar" ? adicionarAnotacao : editarAnotacao
            }
            style={{
              ...styles.btnAdd,
              backgroundColor: nova !== "" ? "#069" : "white",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontFamily: "Lobster_400Regular",
              }}
            >
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  info: {
    padding: 20,
    paddingTop: 50,
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Lobster_400Regular",
  },
  btnContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  btnCancel: {
    width: 70,
    height: 70,
    backgroundColor: "#b00",
    borderRadius: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#fff",
  },
  btnAdd: {
    width: 70,
    height: 70,
    backgroundColor: "#069",
    borderRadius: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#fff",
  },
});
