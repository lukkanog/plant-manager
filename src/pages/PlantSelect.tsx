import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator
} from "react-native";

import { Header } from "../components/Header";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Load } from "../components/Load";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import api from "../services/api";
import { useNavigation } from "@react-navigation/core";
import { PlantProps} from "../libs/storage";


interface EnvironmentProps {
    key: string,
    title: string,
}

export function PlantSelect() {
    const navigation = useNavigation();

    const [ environments, setEnvironments ] = useState<EnvironmentProps[]>([]);
    const [ plants, setPlants ] = useState<PlantProps[]>([]);
    const [ filteredPlants, setFilteredPlants ] = useState<PlantProps[]>([]);
    const [ environmentSelected, setEnvironmentSelected ] = useState("all");
    const [ loading, setLoading ] = useState(true);
    const [ page, setPage ] = useState(1);
    const [ loadingMore, setLoadingMore ] = useState(true);

    function handleEnvironmentSelect(environment: string) {
        setEnvironmentSelected(environment);

        if (environment === 'all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        )

        setFilteredPlants(filtered);
    }

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=10`);
        setPlants(data);
        setFilteredPlants(data);
        setLoading(false);

        if (!data)
            return setLoading(true);

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
            return;
        }

        setPlants(data);
        setFilteredPlants(data);
        
    }

    async function fetchEnvironments() {
        const { data } = await api.get('plants_environments?_sort=title&_order=asc');

        setEnvironments([
            {
                key: 'all',
                title: 'Todos'
            },
            ...data
        ]);

    }

    function handleFetchMore(distance: number) {
        if (distance < 1)
          return;
    
        setLoadingMore(true);
        setPage(oldValue => oldValue++);
        fetchPlants();
      }

    useEffect(() => {
        fetchEnvironments();
        fetchPlants();
    }, [])

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', { plant });
      }

    if (loading)
        return <Load />

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                <Header />

                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>Você quer colocar sua planta?</Text>
            </View>

            <View>
                <FlatList
                    data={environments}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelect(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>

            <View>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            onPress={() => handlePlantSelect(item)}
                            data={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.plantsList}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        color: colors.red,
        paddingBottom: 200,
    },
    header: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 17,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
        color: colors.heading,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center",
    },
    plantsList: {
        paddingBottom: 80,
    }



})