import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Chart } from "chart.js";

import * as L from "leaflet";
import "leaflet.heat/dist/leaflet-heat.js";
import { addressPoints } from "src/assets/realworld.1000";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  user: Observable<any>;
  addresses: Observable<any>;

  constructor(private firestore: AngularFirestore) {
    this.user = null;
  }

  ngOnInit(): void {
    this.user = this.firestore
      .collection("Patients")
      .doc("02TpQ2jccAC96VdlKVUm")
      .valueChanges();

    this.addresses = this.firestore
      .doc("/Patients/02TpQ2jccAC96VdlKVUm")
      .valueChanges();

    this.addresses.subscribe((res) => console.log("addresses", res)); // print the object when the observable changes

    //จำนวณของผู้ป่วยปีงบประมาณ//
    const budget = document.getElementById("Budget");
    const Budget = new Chart(budget, {
      type: "bar",
      data: {
        labels: [
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
        ],
        datasets: [
          {
            data: [157, 80, 40, 139, 5, 67, 29, 52, 25, 6, 0],
            backgroundColor: [
              "#54bebe",
              "#54bebe",
              "#54bebe",
              "#54bebe",
              "#54bebe",
              "#54bebe",
              "#54bebe",
              "#54bebe",
              "#54bebe",
              "#54bebe",
            ],

            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,

        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          y: {
            beginAtZero: true,
            ticks: {
              display: true,
            },
          },
        },
      },
    });

    //ผู้ป่วยรายเดือน//
    const monthly = document.getElementById("Monthly");
    const Monthly = new Chart(monthly, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],

        datasets: [
          {
            label: "My Second dataset",
            backgroundColor: "rgba(151,187,205,1)",
            borderColor: "#54bebe",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            pointBorderWidth: 1,
            data: [82, 23, 66, 9, 99, 4, 2, 0, 5, 70, 6, 42],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,

        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          y: {
            beginAtZero: true,
            ticks: {
              display: true,
            },
          },
        },
        elements: {
          line: {
            fill: false,
          },
        },
      },
    });

    //เพศ//

    var gender = document.getElementById("Gender");
    var Gender = new Chart(gender, {
      type: "doughnut",

      data: {
        labels: ["เพศชาย", "เพศหญิง"],
        datasets: [
          {
            data: [20, 15],
            backgroundColor: ["#54bebe", "#d7658b"],
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
      },
    });

    //ผลการวินิจฉัยโรค//
    var diagnosis = document.getElementById("Diagnosis");
    var Diagnosis = new Chart(diagnosis, {
      type: "pie",

      data: {
        labels: ["คนไทย", "ต.2"],
        datasets: [
          {
            data: [20, 15],
            backgroundColor: ["rgba(3, 88, 106, 0.70)", "#98d1d1"],
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
      },
    });

    //จำนวณของผู้ป่วยปีงบประมาณ//
    const agegroup = document.getElementById("Agegroup");
    const Agegroup = new Chart(agegroup, {
      type: "bar",
      data: {
        labels: ["0-11", "12-24", "25-30", "30-44", "=>45"],
        datasets: [
          {
            data: [1, 5, 7, 10, 4, 0],
            backgroundColor: [
              "#badbdb",
              "#dedad2",
              "#e4bcad",
              "#df979e",
              "#d7658b",
            ],

            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,

        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          y: {
            beginAtZero: true,
            ticks: {
              display: true,
            },
          },
        },
      },
    });

    var time = document.getElementById(
      "Time"
    );
    const time_nums = [31, 74, 6, 39, 20, 85, 7, 40, 30, 20, 90, 60];
    const time_nums2 = [12, 5, 40, 3, 48, 70, 4, 60, 60, 50, 1, 0];
    const time_nums3 = [82, 66, 9, 99, 4, 2, 5, 46, 85, 10, 65, 40];

    var Time = new Chart(time, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "กรณีผู้ป่วยที่ไม่ได้ดำเนินการ",
            backgroundColor: "#fff",
            borderColor: "#d7658b",
            pointBorderColor: "#d7658b",
            pointBackgroundColor: "#d7658b",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [
              time_nums[0],
              time_nums[1],
              time_nums[2],
              time_nums[3],
              time_nums[4],
              time_nums[5],
              time_nums[6],
              time_nums[7],
              time_nums[8],
              time_nums[9],
              time_nums[10],
              time_nums[11],
            ],
          },

          {
            label: "กรณีผู้ป่วยที่ดำเนินการตามมาตรฐาน",
            backgroundColor: "#fff",
            borderColor: "#54bebe",
            pointBorderColor: "#54bebe",
            pointBackgroundColor: "#54bebe",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [
              time_nums2[0],
              time_nums2[1],
              time_nums2[2],
              time_nums2[3],
              time_nums2[4],
              time_nums2[5],
              time_nums2[6],
              time_nums2[7],
              time_nums2[8],
              time_nums2[9],
              time_nums2[10],
              time_nums2[11],
            ],
          },

          {
            label: "กรณีผู้ป่วยที่ไม่ได้ดำเนินการตามมาตรฐาน",
            backgroundColor: "#fff",
            borderColor: "rgba(3, 88, 106, 0.70)",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [
              time_nums3[0],
              time_nums3[1],
              time_nums3[2],
              time_nums3[3],
              time_nums3[4],
              time_nums3[5],
              time_nums3[6],
              time_nums3[7],
              time_nums3[8],
              time_nums3[9],
              time_nums3[10],
              time_nums3[11],
            ],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,

        legend: {
          display: true,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
          y: {
            beginAtZero: true,
            ticks: {
              display: true,
            },
          },
        },
        elements: {
          line: {
            fill: false,
          },
        },
      },
    });

    //สัดส่วนผลการปฎิบัติงาน//
    const performanceratio = document.getElementById("Performanceratio");
    const Performanceratio = new Chart(performanceratio, {
      type: "doughnut",

      data: {
        labels: [
          "กรณีผู้ป่วยที่ไม่ได้ดำเนินการ",
          "กรณีผู้ป่วยที่ไม่ได้ดำเนินการ",
          "กรณีผู้ป่วยที่ไม่ได้ดำเนินการตามมาตรฐาน",
        ],
        datasets: [
          {
            data: [502, 353, 513],
            backgroundColor: ["#d7658b", "#54bebe", "rgba(3, 88, 106, 0.70)"],

            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
      },
    });
  }

  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 15,
        minZoom: 5,
      }),
    ],
    zoom: 10,
    center: L.latLng(13.721587, 100.491355),
  };
  onMapReady(map: any) {
    let newAddressPoints = addressPoints.map(function (p: any) {
      return [p[0], p[1]];
    });
    const heat = (L as any).heatLayer(newAddressPoints).addTo(map);
  }


}
