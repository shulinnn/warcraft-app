import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";

export default function Layout() {
  NavigationBar.setVisibilityAsync("hidden");

  return (
    <>
      <StatusBar hidden />
      <Drawer
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
          drawerStyle: {
            backgroundColor: "#002650",
          },
          drawerInactiveTintColor: "#FFF",
          drawerActiveTintColor: "#FFF",
        }}
      >
        <Drawer.Screen
          name="lobby/index"
          options={{ drawerLabel: "Lobby", unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="lobby/heroes"
          options={{
            drawerLabel: "Hrdinové",
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/units"
          options={{
            drawerLabel: "Jednotky",
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/tavern"
          options={{
            drawerLabel: "Taverna",
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/buildings"
          options={{
            drawerLabel: "Budovy",
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/shop"
          options={{
            drawerLabel: "Obchod",
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/neutralShop"
          options={{
            drawerLabel: "Neutrální obchod",
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/creeps"
          options={{
            drawerLabel: "Creepy",
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/cards"
          options={{
            drawerLabel: "Karty",
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/maps"
          options={{
            drawerLabel: "Mapy",
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/rules"
          options={{
            drawerLabel: "Základní pravidla",
            drawerItemStyle: {
              borderTopColor: "#FFFFFF10",
              borderTopWidth: 1,
            },
          }}
        />
        <Drawer.Screen
          name="lobby/hero/[id]"
          options={{
            drawerItemStyle: { display: "none" },
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/creep/[id]"
          options={{
            drawerItemStyle: { display: "none" },
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/unit/[id]"
          options={{
            drawerItemStyle: { display: "none" },
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="lobby/map/[id]"
          options={{
            drawerItemStyle: { display: "none" },
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Změnit rasu",
          }}
        />
      </Drawer>
    </>
  );
}
