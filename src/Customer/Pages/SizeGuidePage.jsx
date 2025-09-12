import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navigation/Navbar";
import "../Styles/SizeGuidePage.css";

const SizeGuidePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="size-guide-page">
        <h1 className="title">Size Guide</h1>
        <p className="subtitle">
          Find your perfect fit with our detailed size charts for Men, Women,
          and Unisex clothing. Measurements are shown in **inches**.
        </p>

        {/* Men’s Size Chart */}
        <section className="size-section">
          <h2>Men’s Size Chart</h2>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest (in)</th>
                <th>Waist (in)</th>
                <th>Hip (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>S</td>
                <td>36 - 38</td>
                <td>30 - 32</td>
                <td>36 - 38</td>
              </tr>
              <tr>
                <td>M</td>
                <td>39 - 41</td>
                <td>33 - 35</td>
                <td>39 - 41</td>
              </tr>
              <tr>
                <td>L</td>
                <td>42 - 44</td>
                <td>36 - 38</td>
                <td>42 - 44</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>45 - 47</td>
                <td>39 - 41</td>
                <td>45 - 47</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Women’s Size Chart (India-friendly) */}
        <section className="size-section">
          <h2>Women’s Size Chart</h2>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Bust (in)</th>
                <th>Waist (in)</th>
                <th>Hip (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>XS</td>
                <td>28 - 29</td>
                <td>22 - 23</td>
                <td>30 - 32</td>
              </tr>
              <tr>
                <td>S</td>
                <td>30 - 32</td>
                <td>24 - 25</td>
                <td>33 - 35</td>
              </tr>
              <tr>
                <td>M</td>
                <td>33 - 35</td>
                <td>26 - 28</td>
                <td>36 - 38</td>
              </tr>
              <tr>
                <td>L</td>
                <td>36 - 38</td>
                <td>29 - 31</td>
                <td>39 - 41</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>39 - 41</td>
                <td>32 - 34</td>
                <td>42 - 44</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Unisex Size Chart */}
        <section className="size-section">
          <h2>Unisex Size Chart</h2>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest (in)</th>
                <th>Waist (in)</th>
                <th>Hip (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>XS</td>
                <td>32 - 34</td>
                <td>26 - 28</td>
                <td>32 - 34</td>
              </tr>
              <tr>
                <td>S</td>
                <td>35 - 37</td>
                <td>29 - 31</td>
                <td>35 - 37</td>
              </tr>
              <tr>
                <td>M</td>
                <td>38 - 40</td>
                <td>32 - 34</td>
                <td>38 - 40</td>
              </tr>
              <tr>
                <td>L</td>
                <td>41 - 43</td>
                <td>35 - 37</td>
                <td>41 - 43</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Conversion Chart */}
        <section className="size-section">
          <h2>International Size Conversion</h2>
          <table>
            <thead>
              <tr>
                <th>India</th>
                <th>US</th>
                <th>UK</th>
                <th>EU</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>XS</td>
                <td>2</td>
                <td>6</td>
                <td>34</td>
              </tr>
              <tr>
                <td>S</td>
                <td>4</td>
                <td>8</td>
                <td>36</td>
              </tr>
              <tr>
                <td>M</td>
                <td>6</td>
                <td>10</td>
                <td>38</td>
              </tr>
              <tr>
                <td>L</td>
                <td>8</td>
                <td>12</td>
                <td>40</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>10</td>
                <td>14</td>
                <td>42</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Measurement Tips */}
        <section className="tips">
          <h2>How to Measure</h2>
          <ul>
            <li>
              <strong>Bust / Chest:</strong> Measure around the fullest part of
              your chest.
            </li>
            <li>
              <strong>Waist:</strong> Measure around the natural waistline, just
              above your belly button.
            </li>
            <li>
              <strong>Hip:</strong> Measure around the widest part of your hips.
            </li>
          </ul>

          <div className="diagram-section">
            {/* Men’s Diagram */}
            <div className="diagram-box">
              <h3>Men</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 400"
                width="150"
                height="300"
              >
                {/* Body outline */}
                <circle
                  cx="100"
                  cy="40"
                  r="30"
                  fill="#f4d7d7"
                  stroke="#333"
                  strokeWidth="2"
                />
                <rect
                  x="70"
                  y="70"
                  width="60"
                  height="180"
                  rx="30"
                  fill="#f4d7d7"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Legs */}
                <rect
                  x="70"
                  y="250"
                  width="25"
                  height="100"
                  fill="#f4d7d7"
                  stroke="#333"
                  strokeWidth="2"
                />
                <rect
                  x="105"
                  y="250"
                  width="25"
                  height="100"
                  fill="#f4d7d7"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Arms */}
                <rect
                  x="40"
                  y="90"
                  width="25"
                  height="120"
                  fill="#f4d7d7"
                  stroke="#333"
                  strokeWidth="2"
                />
                <rect
                  x="135"
                  y="90"
                  width="25"
                  height="120"
                  fill="#f4d7d7"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Chest line */}
                <line
                  x1="60"
                  y1="120"
                  x2="140"
                  y2="120"
                  stroke="red"
                  strokeWidth="2"
                />
                <text x="145" y="125" fontSize="10" fill="red">
                  Chest
                </text>

                {/* Waist line */}
                <line
                  x1="65"
                  y1="170"
                  x2="135"
                  y2="170"
                  stroke="green"
                  strokeWidth="2"
                />
                <text x="140" y="175" fontSize="10" fill="green">
                  Waist
                </text>

                {/* Hip line */}
                <line
                  x1="55"
                  y1="220"
                  x2="145"
                  y2="220"
                  stroke="blue"
                  strokeWidth="2"
                />
                <text x="150" y="225" fontSize="10" fill="blue">
                  Hip
                </text>
              </svg>
            </div>

            {/* Women’s Diagram */}
            <div className="diagram-box">
              <h3>Women</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 400"
                width="150"
                height="300"
              >
                {/* Head */}
                <circle
                  cx="100"
                  cy="40"
                  r="28"
                  fill="#fbe3e8"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Torso with waist curve */}
                <path
                  d="M70 70 Q60 150 70 250 L130 250 Q140 150 130 70 Z"
                  fill="#fbe3e8"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Legs */}
                <rect
                  x="75"
                  y="250"
                  width="20"
                  height="100"
                  fill="#fbe3e8"
                  stroke="#333"
                  strokeWidth="2"
                />
                <rect
                  x="105"
                  y="250"
                  width="20"
                  height="100"
                  fill="#fbe3e8"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Arms */}
                <rect
                  x="45"
                  y="90"
                  width="20"
                  height="120"
                  fill="#fbe3e8"
                  stroke="#333"
                  strokeWidth="2"
                />
                <rect
                  x="135"
                  y="90"
                  width="20"
                  height="120"
                  fill="#fbe3e8"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Bust line */}
                <line
                  x1="60"
                  y1="110"
                  x2="140"
                  y2="110"
                  stroke="red"
                  strokeWidth="2"
                />
                <text x="145" y="115" fontSize="10" fill="red">
                  Bust
                </text>

                {/* Waist line */}
                <line
                  x1="65"
                  y1="165"
                  x2="135"
                  y2="165"
                  stroke="green"
                  strokeWidth="2"
                />
                <text x="140" y="170" fontSize="10" fill="green">
                  Waist
                </text>

                {/* Hip line */}
                <line
                  x1="55"
                  y1="215"
                  x2="145"
                  y2="215"
                  stroke="blue"
                  strokeWidth="2"
                />
                <text x="150" y="220" fontSize="10" fill="blue">
                  Hip
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* Fit Guide */}
        <section className="fit-guide">
          <h2>Fit Guide</h2>
          <p>
            Our clothing is designed to be true to size. If you are in between
            two sizes:
          </p>
          <ul>
            <li>Choose the smaller size for a slimmer fit.</li>
            <li>Choose the larger size for a more relaxed fit.</li>
          </ul>
        </section>

        {/* Back button */}
        <div className="back-to-shop">
          <button onClick={() => navigate(-1)}>← Back to Product</button>
        </div>
      </main>
    </>
  );
};

export default SizeGuidePage;
