package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var notes = []string{}

// Хендлер для получения заметок
func getNotes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(notes); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

// Хендлер для добавления новой заметки
func addNote(w http.ResponseWriter, r *http.Request) {
	var note string
	if err := json.NewDecoder(r.Body).Decode(&note); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	notes = append(notes, note)
	w.WriteHeader(http.StatusCreated)
}

// Хендлер для удаления заметки
func deleteNote(w http.ResponseWriter, r *http.Request) {
	var index int
	if err := json.NewDecoder(r.Body).Decode(&index); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if index >= 0 && index < len(notes) {
		notes = append(notes[:index], notes[index+1:]...)
	}
	w.WriteHeader(http.StatusOK)
}

func main() {
	http.HandleFunc("/notes", getNotes)          // Получить заметки
	http.HandleFunc("/notes/add", addNote)       // Добавить заметку
	http.HandleFunc("/notes/delete", deleteNote) // Удалить заметку

	port := ":8080"
	fmt.Printf("Server is running at %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Println("Server failed:", err)
	}
}
