package main

import (
	"encoding/json"
    "log"
    "net/http"
	"strconv"
	"github.com/gorilla/mux"
)

func main()  {
	router := mux.NewRouter()

	router.HandleFunc("/vinhos", GetWines).Methods("GET")
	router.HandleFunc("/vinhos/{id}", GetWine).Methods("GET")
	router.HandleFunc("/vinhos", CreateWine).Methods("POST")
	router.HandleFunc("/vinhos/{id}", UpdateWine).Methods("PUT")
	router.HandleFunc("/vinhos/{id}", DeleteWine).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", router))
}

type Wine struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Year int `json:"year"`
	Producer string `json:"producer"`
	Grape []string `json:"grape"`
	Score float32 `json:"score"`
	TastedAt string `json:"tastedAt"`
	MeetID int `json:"meetId"`
}

var wines []Wine

func GetWines(w http.ResponseWriter, r *http.Request)  {
	json.NewEncoder(w).Encode(wines)
}

func GetWine(w http.ResponseWriter, r *http.Request)  {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	for _, wine := range wines {
		if wine.ID == id {
			json.NewEncoder(w).Encode(wine)
			return
		}
	}

	json.NewEncoder(w).Encode(&Wine{})
}

func CreateWine(w http.ResponseWriter, r *http.Request)  {
	var wine Wine
	_ = json.NewDecoder(r.Body).Decode(&wine)
	wines = append(wines, wine)
	json.NewEncoder(w).Encode(wine)
}

func UpdateWine(w http.ResponseWriter, r *http.Request)  {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	for index, wine := range wines {
		if wine.ID == id {
			wines = append(wines[:index], wines[index+1:]...)
			var wine Wine
			_ = json.NewDecoder(r.Body).Decode(&wine)
			wine.ID = id
			wines = append(wines, wine)
			json.NewEncoder(w).Encode(wine)
			return
		}
	}

	json.NewEncoder(w).Encode(wines)
}

func DeleteWine(w http.ResponseWriter, r *http.Request)  {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	for index, wine := range wines {
		if wine.ID == id {
			wines = append(wines[:index], wines[index+1:]...)
			break
		}
	}

	json.NewEncoder(w).Encode(wines)
}

func init()  {
wines = append(wines, Wine{ID: 1, Name: "Château Lafite Rothschild", Year: 2000, Producer: "Château Lafite Rothschild", Grape: []string{"Cabernet Sauvignon", "Merlot"}, Score: 100, TastedAt: "2020-01-01", MeetID: 1})
	wines = append(wines, Wine{ID: 2, Name: "Château Margaux", Year: 2000, Producer: "Château Margaux", Grape: []string{"Cabernet Sauvignon", "Merlot"}, Score: 100, TastedAt: "2020-01-01", MeetID: 1})
	wines = append(wines, Wine{ID: 3, Name: "Château Latour", Year: 2000, Producer: "Château Latour", Grape: []string{"Cabernet Sauvignon", "Merlot"}, Score: 100, TastedAt: "2020-01-01", MeetID: 1})
	wines = append(wines, Wine{ID: 4, Name: "Château Haut-Brion", Year: 2000, Producer: "Château Haut-Brion", Grape: []string{"Cabernet Sauvignon", "Merlot"}, Score: 100, TastedAt: "2020-01-01", MeetID: 1})
	wines = append(wines, Wine{ID: 5, Name: "Château Mouton Rothschild", Year: 2000, Producer: "Château Mouton Rothschild", Grape: []string{"Cabernet Sauvignon", "Merlot"}, Score: 100, TastedAt: "2020-01-01", MeetID: 1})
}
