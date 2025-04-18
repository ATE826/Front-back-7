package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Массив заметок
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
	// Чтение тела запроса и декодирование
	if err := json.NewDecoder(r.Body).Decode(&note); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	notes = append(notes, note)       // Добавляем заметку в список
	w.WriteHeader(http.StatusCreated) // Возвращаем статус 201
}

func main() {
	// Маршруты
	http.HandleFunc("/notes", getNotes)    // Получить заметки
	http.HandleFunc("/notes/add", addNote) // Добавить заметку

	// Запуск сервера
	port := ":8080"
	fmt.Printf("Server is running at %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Println("Server failed:", err)
	}
}
